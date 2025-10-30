import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const galleryItems = [
  {
    id: 1,
    title: 'Киберпанк город',
    image: 'https://cdn.poehali.dev/projects/99699976-9f48-442f-a299-fc25d6f3141d/files/392ca996-0aa2-44fe-9cf1-abdbff248536.jpg',
    duration: '15 сек',
    views: '2.4K',
    category: 'Научная фантастика'
  },
  {
    id: 2,
    title: 'Магический лес',
    image: 'https://cdn.poehali.dev/projects/99699976-9f48-442f-a299-fc25d6f3141d/files/84314e2e-ca37-4193-8248-31ed26bbdb02.jpg',
    duration: '12 сек',
    views: '1.8K',
    category: 'Фэнтези'
  },
  {
    id: 3,
    title: 'Футуристичный интерфейс',
    image: 'https://cdn.poehali.dev/projects/99699976-9f48-442f-a299-fc25d6f3141d/files/3f7a1f7e-cf74-48cb-84ca-ec17a99592e7.jpg',
    duration: '10 сек',
    views: '3.1K',
    category: 'Технологии'
  }
];

export default function VideoGallery() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto animate-fade-in">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-gradient">
          Галерея примеров
        </h2>
        <p className="text-muted-foreground text-lg">
          Видео, созданные с помощью AI из статичных изображений
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryItems.map((item, index) => (
          <Card 
            key={item.id} 
            className="glass-effect overflow-hidden group cursor-pointer hover:scale-105 transition-all duration-300"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="relative aspect-video overflow-hidden">
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary/80 backdrop-blur-sm flex items-center justify-center animate-pulse-glow">
                    <Icon name="Play" size={32} className="text-white ml-1" />
                  </div>
                </div>
              </div>
              <Badge className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm">
                <Icon name="Clock" size={14} className="mr-1" />
                {item.duration}
              </Badge>
            </div>

            <div className="p-4 space-y-3">
              <h3 className="font-semibold text-lg">{item.title}</h3>
              
              <div className="flex items-center justify-between text-sm">
                <Badge variant="secondary" className="text-xs">
                  {item.category}
                </Badge>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Icon name="Eye" size={16} />
                  <span>{item.views}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button className="flex-1 px-3 py-2 rounded-md bg-primary/20 hover:bg-primary/30 transition-colors text-sm font-medium">
                  <Icon name="Download" size={16} className="inline mr-1" />
                  Скачать
                </button>
                <button className="px-3 py-2 rounded-md bg-muted hover:bg-muted/80 transition-colors">
                  <Icon name="Share2" size={16} />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="text-center pt-8">
        <Card className="glass-effect p-8 max-w-2xl mx-auto">
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center animate-float">
              <Icon name="Sparkles" size={32} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold">Создайте своё AI видео</h3>
            <p className="text-muted-foreground">
              Загрузите изображение и получите реалистичное видео за считанные секунды
            </p>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-primary via-secondary to-accent font-semibold hover:scale-105 transition-transform glow-effect"
            >
              Попробовать сейчас
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
