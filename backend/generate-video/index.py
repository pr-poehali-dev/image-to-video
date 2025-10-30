import json
import os
import replicate
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Generate video from image using AI
    Args: event - dict with httpMethod, body (image_url, prompt, duration)
          context - object with request_id, function_name attributes
    Returns: HTTP response with video URL
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    body_str = event.get('body', '{}')
    if not body_str or body_str.strip() == '':
        body_str = '{}'
    
    body_data = json.loads(body_str)
    image_url: str = body_data.get('image_url', '')
    prompt: str = body_data.get('prompt', '')
    duration: int = body_data.get('duration', 10)
    
    if not image_url or not prompt:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'image_url and prompt are required'})
        }
    
    api_token = os.environ.get('REPLICATE_API_TOKEN')
    if not api_token:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'REPLICATE_API_TOKEN not configured'})
        }
    
    os.environ['REPLICATE_API_TOKEN'] = api_token
    
    output = replicate.run(
        "stability-ai/stable-video-diffusion:3f0457e4619daac51203dedb472816fd4af51f3149fa7a9e0b5ffcf1b8172438",
        input={
            "input_image": image_url,
            "motion_bucket_id": 127,
            "frames_per_second": 6,
            "cond_aug": 0.02
        }
    )
    
    video_url = output if isinstance(output, str) else (output[0] if output else None)
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'isBase64Encoded': False,
        'body': json.dumps({
            'video_url': video_url,
            'prompt': prompt,
            'duration': duration,
            'request_id': context.request_id
        })
    }