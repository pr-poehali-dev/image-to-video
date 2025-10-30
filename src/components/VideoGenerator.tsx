import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

export default function VideoGenerator() {
  const [image, setImage] = useState<string | null>(null);
  const [duration, setDuration] = useState([10]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  return (
    <Card className="glass-effect p-8 max-w-4xl mx-auto animate-fade-in">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold text-gradient">
            AI Видео Генератор
          </h2>
          <p className="text-muted-foreground text-lg">
            Превратите изображение в реалистичное видео за секунды
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Label className="text-lg font-semibold">Загрузите изображение</Label>
            <div 
              className="border-2 border-dashed border-primary/50 rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer group"
              onClick={() => document.getElementById('image-upload')?.click()}
            >
              {image ? (
                <img src={image} alt="Uploaded" className="w-full h-64 object-cover rounded-lg" />
              ) : (
                <div className="space-y-4">
                  <div className="w-20 h-20 mx-auto rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                    <Icon name="Upload" size={40} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-lg font-medium">Нажмите для загрузки</p>
                    <p className="text-sm text-muted-foreground">PNG, JPG до 10MB</p>
                  </div>
                </div>
              )}
            </div>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <Label className="text-lg font-semibold">
                Длительность видео: {duration[0]} секунд
              </Label>
              <Slider
                value={duration}
                onValueChange={setDuration}
                min={5}
                max={20}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>5 сек</span>
                <span>20 сек</span>
              </div>
            </div>

            <div className="space-y-4 p-6 glass-effect rounded-lg">
              <div className="flex items-center gap-3">
                <Icon name="Sparkles" size={24} className="text-accent" />
                <span className="text-sm font-medium">AI Настройки</span>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Качество</span>
                  <span className="text-foreground">Ultra HD</span>
                </div>
                <div className="flex justify-between">
                  <span>FPS</span>
                  <span className="text-foreground">60</span>
                </div>
                <div className="flex justify-between">
                  <span>Реализм</span>
                  <span className="text-foreground">Максимальный</span>
                </div>
              </div>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={!image || isGenerating}
              className="w-full h-14 text-lg font-semibold glow-effect hover:scale-105 transition-transform"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Icon name="Loader2" size={24} className="mr-2 animate-spin" />
                  Генерация...
                </>
              ) : (
                <>
                  <Icon name="Wand2" size={24} className="mr-2" />
                  Создать видео
                </>
              )}
            </Button>

            {isGenerating && (
              <div className="space-y-2 animate-fade-in">
                <Progress value={progress} className="h-2" />
                <p className="text-sm text-center text-muted-foreground">
                  {progress}% завершено
                </p>
              </div>
            )}
          </div>
        </div>

        {progress === 100 && (
          <div className="mt-8 p-6 glass-effect rounded-lg animate-fade-in space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Icon name="CheckCircle2" size={24} className="text-green-500" />
                <span className="text-lg font-semibold">Видео готово!</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Icon name="Download" size={18} className="mr-2" />
                  Скачать
                </Button>
                <Button variant="outline" size="sm">
                  <Icon name="Share2" size={18} className="mr-2" />
                  Поделиться
                </Button>
              </div>
            </div>
            <div className="aspect-video bg-black/50 rounded-lg flex items-center justify-center">
              <div className="text-center space-y-2">
                <Icon name="Play" size={64} className="mx-auto text-primary animate-pulse-glow" />
                <p className="text-sm text-muted-foreground">Кликните для просмотра</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
