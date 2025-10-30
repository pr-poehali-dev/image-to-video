import VideoGenerator from '@/components/VideoGenerator';
import VideoGallery from '@/components/VideoGallery';
import Icon from '@/components/ui/icon';

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative">
        <header className="container mx-auto px-4 py-8">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Icon name="Video" size={24} className="text-white" />
              </div>
              <span className="text-2xl font-bold text-gradient">AI Video Studio</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors">
                Примеры
              </button>
              <button className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors">
                API
              </button>
              <button className="px-6 py-2 rounded-lg bg-primary hover:bg-primary/90 font-medium transition-all hover:scale-105">
                Войти
              </button>
            </div>
          </nav>
        </header>

        <main className="container mx-auto px-4 py-12 space-y-24">
          <section className="text-center space-y-6 py-12">
            <div className="inline-block animate-float">
              <div className="px-6 py-2 rounded-full glass-effect border border-primary/30 text-sm font-medium">
                <Icon name="Zap" size={16} className="inline mr-2 text-accent" />
                Powered by Advanced AI
              </div>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
              <span className="text-gradient">Создавайте видео</span>
              <br />
              из изображений
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Превращайте статичные изображения в реалистичные видео длиной до 20 секунд
              с помощью искусственного интеллекта
            </p>
            <div className="flex items-center justify-center gap-6 pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon name="Clock" size={18} className="text-accent" />
                <span>До 20 секунд</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon name="Sparkles" size={18} className="text-secondary" />
                <span>Ultra HD качество</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon name="Zap" size={18} className="text-primary" />
                <span>60 FPS</span>
              </div>
            </div>
          </section>

          <section id="generator">
            <VideoGenerator />
          </section>

          <section id="gallery">
            <VideoGallery />
          </section>

          <section className="py-12">
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: 'Wand2',
                  title: 'AI технология',
                  description: 'Передовые алгоритмы машинного обучения для реалистичной генерации'
                },
                {
                  icon: 'Zap',
                  title: 'Быстрая обработка',
                  description: 'Создание видео занимает всего несколько секунд'
                },
                {
                  icon: 'Shield',
                  title: 'Безопасность',
                  description: 'Ваши данные защищены и не используются для обучения'
                }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="glass-effect p-8 rounded-2xl hover:scale-105 transition-transform animate-fade-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
                    <Icon name={feature.icon as any} size={28} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>
        </main>

        <footer className="container mx-auto px-4 py-12 border-t border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Video" size={20} className="text-primary" />
              <span className="text-sm text-muted-foreground">AI Video Studio © 2024</span>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Документация
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Поддержка
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                API
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
