import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

const Index = () => {
  const { toast } = useToast();
  const [calcType, setCalcType] = useState('frame-house');
  const [calcArea, setCalcArea] = useState('');
  const [calcFloors, setCalcFloors] = useState('1');
  const [calcPrice, setCalcPrice] = useState<number | null>(null);
  
  const [formOpen, setFormOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    projectType: 'frame-house',
    message: ''
  });

  const categories = [
    {
      id: 'frame-house',
      title: 'Каркасные дома',
      description: 'Современные энергоэффективные дома',
      image: 'https://cdn.poehali.dev/projects/1facf563-acf7-4911-a4fc-00f5625ed9db/files/1b45720f-c5e9-4631-a949-e4c4d798b972.jpg',
      icon: 'Home'
    },
    {
      id: 'bathhouse',
      title: 'Бани',
      description: 'Традиционные и современные бани',
      image: 'https://cdn.poehali.dev/projects/1facf563-acf7-4911-a4fc-00f5625ed9db/files/b17e0445-6cb2-41ad-80d1-81eff74e32c9.jpg',
      icon: 'Droplets'
    },
    {
      id: 'gazebo',
      title: 'Беседки',
      description: 'Уютные места для отдыха',
      image: 'https://cdn.poehali.dev/projects/1facf563-acf7-4911-a4fc-00f5625ed9db/files/db179b69-3072-40a1-adb5-7a737bf586f1.jpg',
      icon: 'TreePine'
    },
    {
      id: 'terrace',
      title: 'Террасы',
      description: 'Элегантные террасы и веранды',
      image: 'https://cdn.poehali.dev/projects/1facf563-acf7-4911-a4fc-00f5625ed9db/files/c6f9f6e8-3e24-46b8-8aab-6dcb195fc8e3.jpg',
      icon: 'Fence'
    }
  ];

  const projects = [
    { id: 1, name: 'Скандинавия', category: 'frame-house', area: 120, price: '4 500 000', floors: 2 },
    { id: 2, name: 'Уют', category: 'frame-house', area: 85, price: '3 200 000', floors: 1 },
    { id: 3, name: 'Семейная', category: 'frame-house', area: 150, price: '5 800 000', floors: 2 },
    { id: 4, name: 'Классика', category: 'bathhouse', area: 40, price: '1 800 000', floors: 1 },
    { id: 5, name: 'Люкс', category: 'bathhouse', area: 60, price: '2 500 000', floors: 1 },
    { id: 6, name: 'Шестигранная', category: 'gazebo', area: 20, price: '450 000', floors: 1 },
    { id: 7, name: 'Открытая', category: 'terrace', area: 30, price: '680 000', floors: 1 }
  ];

  const services = [
    { icon: 'Hammer', title: 'Проектирование', description: 'Индивидуальные и типовые проекты' },
    { icon: 'Truck', title: 'Доставка материалов', description: 'Собственная логистика' },
    { icon: 'Wrench', title: 'Строительство', description: 'Полный цикл работ под ключ' },
    { icon: 'Shield', title: 'Гарантия', description: 'До 10 лет на все работы' }
  ];

  const reviews = [
    { name: 'Алексей М.', text: 'Построили дом за 4 месяца. Качество отличное, всё по договору!', rating: 5 },
    { name: 'Ольга К.', text: 'Баня просто супер! Дерево пахнет, всё сделано аккуратно.', rating: 5 },
    { name: 'Дмитрий П.', text: 'Профессиональная команда. Рекомендую!', rating: 5 }
  ];

  const calculatePrice = () => {
    const area = parseFloat(calcArea);
    if (!area || area <= 0) return;

    const basePrices: Record<string, number> = {
      'frame-house': 35000,
      'bathhouse': 45000,
      'gazebo': 22000,
      'terrace': 18000
    };

    const floorMultiplier = calcFloors === '2' ? 1.3 : 1;
    const price = area * basePrices[calcType] * floorMultiplier;
    setCalcPrice(Math.round(price));
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone) {
      toast({
        title: 'Ошибка',
        description: 'Заполните обязательные поля: имя и телефон',
        variant: 'destructive'
      });
      return;
    }

    toast({
      title: 'Заявка отправлена! ✅',
      description: 'Мы свяжемся с вами в ближайшее время',
    });

    setFormData({
      name: '',
      phone: '',
      email: '',
      projectType: 'frame-house',
      message: ''
    });
    setFormOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="TreePine" size={28} className="text-primary" />
            <span className="text-xl font-bold text-primary">ЛесСтрой</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#catalog" className="text-sm font-medium hover:text-primary transition-colors">Каталог</a>
            <a href="#projects" className="text-sm font-medium hover:text-primary transition-colors">Проекты</a>
            <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">О компании</a>
            <a href="#services" className="text-sm font-medium hover:text-primary transition-colors">Услуги</a>
            <a href="#reviews" className="text-sm font-medium hover:text-primary transition-colors">Отзывы</a>
            <a href="#calculator" className="text-sm font-medium hover:text-primary transition-colors">Калькулятор</a>
            <a href="#contacts" className="text-sm font-medium hover:text-primary transition-colors">Контакты</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button className="hidden md:inline-flex" onClick={() => setFormOpen(true)}>
              <Icon name="Phone" size={16} className="mr-2" />
              Позвонить
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Icon name="Menu" size={24} />
            </Button>
          </div>
        </div>
      </header>

      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Icon name="TreePine" size={24} className="text-primary" />
              ЛесСтрой
            </SheetTitle>
            <SheetDescription>
              Строительство деревянных домов
            </SheetDescription>
          </SheetHeader>
          <nav className="flex flex-col gap-4 mt-8">
            <a
              href="#catalog"
              className="flex items-center gap-3 text-lg font-medium hover:text-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Icon name="Layers" size={20} />
              Каталог
            </a>
            <a
              href="#projects"
              className="flex items-center gap-3 text-lg font-medium hover:text-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Icon name="Home" size={20} />
              Проекты
            </a>
            <a
              href="#about"
              className="flex items-center gap-3 text-lg font-medium hover:text-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Icon name="Info" size={20} />
              О компании
            </a>
            <a
              href="#services"
              className="flex items-center gap-3 text-lg font-medium hover:text-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Icon name="Wrench" size={20} />
              Услуги
            </a>
            <a
              href="#reviews"
              className="flex items-center gap-3 text-lg font-medium hover:text-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Icon name="Star" size={20} />
              Отзывы
            </a>
            <a
              href="#calculator"
              className="flex items-center gap-3 text-lg font-medium hover:text-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Icon name="Calculator" size={20} />
              Калькулятор
            </a>
            <a
              href="#contacts"
              className="flex items-center gap-3 text-lg font-medium hover:text-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Icon name="MapPin" size={20} />
              Контакты
            </a>
          </nav>
          <div className="mt-8 pt-8 border-t">
            <Button
              className="w-full"
              size="lg"
              onClick={() => {
                setMobileMenuOpen(false);
                setFormOpen(true);
              }}
            >
              <Icon name="Send" size={20} className="mr-2" />
              Оставить заявку
            </Button>
            <div className="mt-6 space-y-3 text-sm text-muted-foreground">
              <a href="tel:+79991234567" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Icon name="Phone" size={16} />
                +7 (999) 123-45-67
              </a>
              <a href="mailto:info@lesstroy.ru" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Icon name="Mail" size={16} />
                info@lesstroy.ru
              </a>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://cdn.poehali.dev/projects/1facf563-acf7-4911-a4fc-00f5625ed9db/files/1b45720f-c5e9-4631-a949-e4c4d798b972.jpg')] bg-cover bg-center opacity-10"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <Badge className="mb-4 bg-accent text-accent-foreground">Строительство с 2010 года</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
              Строим дома вашей мечты из натурального дерева
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Каркасные дома, бани, беседки и террасы. Экологично, надёжно, с гарантией.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg" onClick={() => setFormOpen(true)}>
                <Icon name="Send" size={20} className="mr-2" />
                Оставить заявку
              </Button>
              <Button size="lg" variant="outline" className="text-lg" asChild>
                <a href="#calculator">
                  <Icon name="Calculator" size={20} className="mr-2" />
                  Рассчитать стоимость
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Наш каталог</h2>
            <p className="text-muted-foreground text-lg">Выберите категорию строительства</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Card
                key={category.id}
                className="overflow-hidden hover:shadow-lg transition-all duration-300 animate-scale-in cursor-pointer group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <Icon
                    name={category.icon as any}
                    size={32}
                    className="absolute top-4 right-4 text-white"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    Подробнее
                    <Icon name="ArrowRight" size={16} className="ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="py-16 md:py-24 bg-muted/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Популярные проекты</h2>
            <p className="text-muted-foreground text-lg">Готовые решения для вашего участка</p>
          </div>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-5 mb-8">
              <TabsTrigger value="all">Все</TabsTrigger>
              <TabsTrigger value="frame-house">Дома</TabsTrigger>
              <TabsTrigger value="bathhouse">Бани</TabsTrigger>
              <TabsTrigger value="gazebo">Беседки</TabsTrigger>
              <TabsTrigger value="terrace">Террасы</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={categories.find(c => c.id === project.category)?.image}
                        alt={project.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle>{project.name}</CardTitle>
                        <Badge variant="secondary">{project.area} м²</Badge>
                      </div>
                      <CardDescription className="flex items-center gap-2">
                        <Icon name="Layers" size={16} />
                        {project.floors} {project.floors === 1 ? 'этаж' : 'этажа'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-primary">{project.price} ₽</span>
                        <Button size="sm" onClick={() => setFormOpen(true)}>Заказать</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            {categories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects
                    .filter((p) => p.category === category.id)
                    .map((project) => (
                      <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="relative h-56 overflow-hidden">
                          <img
                            src={category.image}
                            alt={project.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <CardTitle>{project.name}</CardTitle>
                            <Badge variant="secondary">{project.area} м²</Badge>
                          </div>
                          <CardDescription className="flex items-center gap-2">
                            <Icon name="Layers" size={16} />
                            {project.floors} {project.floors === 1 ? 'этаж' : 'этажа'}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between items-center">
                            <span className="text-2xl font-bold text-primary">{project.price} ₽</span>
                            <Button size="sm" onClick={() => setFormOpen(true)}>Заказать</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      <section id="about" className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4">О компании</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Строим с любовью к дереву и природе
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                Компания "ЛесСтрой" работает на рынке деревянного строительства с 2010 года. 
                За это время мы построили более 500 объектов по всей России.
              </p>
              <p className="text-muted-foreground text-lg mb-6">
                Мы используем только качественные материалы от проверенных поставщиков и 
                современные технологии строительства. Наша команда — это опытные мастера, 
                которые любят своё дело.
              </p>
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">500+</div>
                  <p className="text-muted-foreground">Построенных объектов</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">14</div>
                  <p className="text-muted-foreground">Лет на рынке</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">100%</div>
                  <p className="text-muted-foreground">Довольных клиентов</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">10</div>
                  <p className="text-muted-foreground">Лет гарантии</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://cdn.poehali.dev/projects/1facf563-acf7-4911-a4fc-00f5625ed9db/files/1b45720f-c5e9-4631-a949-e4c4d798b972.jpg"
                alt="О компании"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-16 md:py-24 bg-muted/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Наши услуги</h2>
            <p className="text-muted-foreground text-lg">Полный цикл строительства</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Icon name={service.icon as any} size={32} className="text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Отзывы клиентов</h2>
            <p className="text-muted-foreground text-lg">Что говорят о нас</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {reviews.map((review, index) => (
              <Card key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    {[...Array(review.rating)].map((_, i) => (
                      <Icon key={i} name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{review.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{review.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="calculator" className="py-16 md:py-24 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4">Калькулятор</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Рассчитать стоимость</h2>
              <p className="text-muted-foreground text-lg">Примерная стоимость вашего проекта</p>
            </div>
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle>Параметры объекта</CardTitle>
                <CardDescription>Укажите данные для расчёта</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="type">Тип строения</Label>
                  <Select value={calcType} onValueChange={setCalcType}>
                    <SelectTrigger id="type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="frame-house">Каркасный дом</SelectItem>
                      <SelectItem value="bathhouse">Баня</SelectItem>
                      <SelectItem value="gazebo">Беседка</SelectItem>
                      <SelectItem value="terrace">Терраса</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="area">Площадь (м²)</Label>
                  <Input
                    id="area"
                    type="number"
                    placeholder="Введите площадь"
                    value={calcArea}
                    onChange={(e) => setCalcArea(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="floors">Количество этажей</Label>
                  <Select value={calcFloors} onValueChange={setCalcFloors}>
                    <SelectTrigger id="floors">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 этаж</SelectItem>
                      <SelectItem value="2">2 этажа</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={calculatePrice} className="w-full" size="lg">
                  <Icon name="Calculator" size={20} className="mr-2" />
                  Рассчитать
                </Button>
                {calcPrice !== null && (
                  <div className="p-6 bg-primary/10 rounded-lg text-center animate-scale-in">
                    <p className="text-sm text-muted-foreground mb-2">Примерная стоимость</p>
                    <p className="text-4xl font-bold text-primary">
                      {calcPrice.toLocaleString('ru-RU')} ₽
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      *Точную стоимость уточняйте у менеджера
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="faq" className="py-16 md:py-24 bg-muted/50">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Часто задаваемые вопросы</h2>
              <p className="text-muted-foreground text-lg">Ответы на популярные вопросы</p>
            </div>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left">
                  Какие сроки строительства дома?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Средний срок строительства каркасного дома площадью 100-150 м² составляет 3-5 месяцев 
                  в зависимости от сложности проекта и погодных условий.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left">
                  Какая гарантия на построенные объекты?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Мы предоставляем гарантию до 10 лет на все строительные работы. Гарантия распространяется 
                  на конструктивные элементы и качество выполненных работ.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left">
                  Можно ли внести изменения в типовой проект?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Да, все наши типовые проекты можно адаптировать под ваши пожелания. Наши архитекторы 
                  помогут внести необходимые изменения с учётом технических требований.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left">
                  Какие материалы вы используете?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Мы работаем только с качественной древесиной камерной сушки, экологичными утеплителями 
                  и современными материалами от проверенных производителей.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Контакты</h2>
              <p className="text-muted-foreground text-lg">Свяжитесь с нами удобным способом</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Icon name="Phone" size={24} className="text-primary" />
                  </div>
                  <CardTitle className="text-lg">Телефон</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold">+7 (999) 123-45-67</p>
                  <p className="text-sm text-muted-foreground mt-2">Пн-Вс: 9:00 - 20:00</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Icon name="Mail" size={24} className="text-primary" />
                  </div>
                  <CardTitle className="text-lg">Email</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold">info@lesstroy.ru</p>
                  <p className="text-sm text-muted-foreground mt-2">Ответим в течение часа</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Icon name="MapPin" size={24} className="text-primary" />
                  </div>
                  <CardTitle className="text-lg">Адрес</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold">г. Москва</p>
                  <p className="text-sm text-muted-foreground mt-2">ул. Строителей, д. 15</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t bg-muted/30 py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="TreePine" size={24} className="text-primary" />
                <span className="text-lg font-bold">ЛесСтрой</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Строительство деревянных домов, бань, беседок и террас с 2010 года
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Каталог</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Каркасные дома</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Бани</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Беседки</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Террасы</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Компания</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#about" className="hover:text-primary transition-colors">О нас</a></li>
                <li><a href="#services" className="hover:text-primary transition-colors">Услуги</a></li>
                <li><a href="#reviews" className="hover:text-primary transition-colors">Отзывы</a></li>
                <li><a href="#contacts" className="hover:text-primary transition-colors">Контакты</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Контакты</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  +7 (999) 123-45-67
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  info@lesstroy.ru
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="MapPin" size={16} />
                  г. Москва, ул. Строителей, 15
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 ЛесСтрой. Все права защищены.</p>
          </div>
        </div>
      </footer>

      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Оставить заявку</DialogTitle>
            <DialogDescription>
              Заполните форму и мы свяжемся с вами в ближайшее время
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitForm} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="form-name">Имя *</Label>
              <Input
                id="form-name"
                placeholder="Ваше имя"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="form-phone">Телефон *</Label>
              <Input
                id="form-phone"
                type="tel"
                placeholder="+7 (999) 123-45-67"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="form-email">Email</Label>
              <Input
                id="form-email"
                type="email"
                placeholder="example@mail.ru"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="form-project">Тип проекта</Label>
              <Select value={formData.projectType} onValueChange={(value) => setFormData({ ...formData, projectType: value })}>
                <SelectTrigger id="form-project">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="frame-house">Каркасный дом</SelectItem>
                  <SelectItem value="bathhouse">Баня</SelectItem>
                  <SelectItem value="gazebo">Беседка</SelectItem>
                  <SelectItem value="terrace">Терраса</SelectItem>
                  <SelectItem value="other">Другое</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="form-message">Сообщение</Label>
              <Textarea
                id="form-message"
                placeholder="Расскажите о вашем проекте..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
              />
            </div>
            <Button type="submit" className="w-full" size="lg">
              <Icon name="Send" size={20} className="mr-2" />
              Отправить заявку
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="lg"
          className="rounded-full h-16 w-16 shadow-2xl hover:scale-110 transition-transform"
          onClick={() => setFormOpen(true)}
        >
          <Icon name="MessageSquare" size={28} />
        </Button>
      </div>
    </div>
  );
};

export default Index;