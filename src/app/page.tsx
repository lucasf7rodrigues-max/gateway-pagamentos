"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Eye, 
  EyeOff, 
  Shield, 
  CreditCard, 
  Smartphone, 
  FileText,
  Lock,
  Mail,
  User,
  CheckCircle,
  Settings,
  Users,
  DollarSign,
  BarChart3,
  AlertTriangle,
  Activity,
  Wallet,
  RefreshCw,
  Ban,
  UserCheck,
  Percent,
  TrendingUp,
  Calendar,
  Search,
  Filter,
  Download,
  Bell,
  LogOut,
  Menu,
  X,
  Home,
  CreditCard as CardIcon,
  Receipt,
  UserX,
  Key,
  Globe,
  Zap,
  ShieldCheck,
  AlertCircle,
  CheckSquare,
  XCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  PieChart,
  LineChart,
  MoreHorizontal,
  Edit,
  Trash2,
  Plus,
  Minus,
  Copy,
  ExternalLink,
  FileDown,
  Upload,
  Database,
  Server,
  Cpu,
  HardDrive,
  Network,
  Monitor,
  Headphones,
  MessageSquare,
  Phone,
  MapPin,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  Star,
  Heart,
  ThumbsUp,
  Flag,
  Archive,
  Bookmark,
  Share2,
  Link,
  QrCode,
  Scan,
  Camera,
  Image,
  Video,
  Music,
  File,
  Folder,
  FolderOpen,
  Save,
  Send,
  Inbox,
  Outbox,
  Mail as MailIcon,
  Phone as PhoneIcon,
  MessageCircle,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Square,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  Radio,
  Tv,
  Gamepad2,
  Joystick,
  Target,
  Award,
  Trophy,
  Medal,
  Gift,
  ShoppingCart,
  ShoppingBag,
  Package,
  Truck,
  MapPin as LocationIcon,
  Navigation,
  Compass,
  Map,
  Route,
  Car,
  Bike,
  Bus,
  Train,
  Plane,
  Ship,
  Anchor,
  Waves,
  Mountain,
  TreePine,
  Sun,
  Moon,
  Cloud,
  CloudRain,
  CloudSnow,
  Zap as Lightning,
  Wind,
  Thermometer,
  Droplets,
  Umbrella,
  Sunrise,
  Sunset,
  Rainbow,
  Snowflake,
  Flame,
  Leaf,
  Flower,
  Flower2,
  Bug,
  Fish,
  Bird,
  Rabbit,
  Squirrel,
  Dog,
  Cat,
  Horse,
  Cow,
  Pig,
  Sheep,
  Chicken,
  Egg,
  Apple,
  Cherry,
  Grape,
  Orange,
  Banana,
  Strawberry,
  Carrot,
  Corn,
  Pizza,
  Coffee,
  Wine,
  Beer,
  IceCream,
  Cake,
  Cookie,
  Candy,
  Lollipop,
  Donut,
  Croissant,
  Sandwich,
  Salad,
  Soup,
  Utensils,
  ChefHat,
  Scale,
  Timer,
  AlarmClock,
  Hourglass,
  Stopwatch,
  Watch,
  Glasses,
  Sunglasses,
  Crown,
  Gem,
  Ring,
  Necklace,
  Shirt,
  Pants,
  Dress,
  Shoe,
  Hat,
  Backpack,
  Briefcase,
  Handbag,
  Luggage,
  Umbrella as UmbrellaIcon,
  Key as KeyIcon,
  Lock as LockIcon,
  Unlock,
  DoorOpen,
  DoorClosed,
  Window,
  Bed,
  Chair,
  Desk,
  Lamp,
  Lightbulb,
  Candle,
  Flashlight,
  Battery,
  BatteryLow,
  Plug,
  Cable,
  Wifi,
  WifiOff,
  Bluetooth,
  Radio as RadioIcon,
  Satellite,
  Antenna,
  Router,
  Smartphone as SmartphoneIcon,
  Tablet,
  Laptop,
  Desktop,
  Keyboard,
  Mouse,
  Printer,
  Scanner,
  Fax,
  Projector,
  Speaker,
  Headphones as HeadphonesIcon,
  Microphone,
  Camera as CameraIcon,
  Video as VideoIcon,
  Film,
  Clapperboard,
  Image as ImageIcon,
  Palette,
  Brush,
  Pen,
  Pencil,
  Eraser,
  Ruler,
  Scissors,
  Paperclip,
  Pin,
  Pushpin,
  Thumbtack,
  Magnet,
  Wrench,
  Screwdriver,
  Hammer,
  Saw,
  Drill,
  Nut,
  Bolt,
  Gear,
  Cog,
  Tool,
  Toolbox,
  HardHat,
  SafetyVest,
  Goggles,
  Gloves,
  Boots,
  Helmet,
  FirstAid,
  Pill,
  Syringe,
  Stethoscope,
  Thermometer as ThermometerIcon,
  Bandage,
  Crutch,
  Wheelchair,
  Hospital,
  Ambulance,
  Cross,
  Heart as HeartIcon,
  Pulse,
  Brain,
  Eye as EyeIcon,
  Ear,
  Nose,
  Mouth,
  Tooth,
  Bone,
  Dna,
  Microscope,
  TestTube,
  Beaker,
  Flask,
  Atom,
  Molecule,
  Magnet as MagnetIcon,
  Zap as ZapIcon,
  Battery as BatteryIcon,
  Fuel,
  Gauge,
  Speedometer,
  Tachometer,
  Compass as CompassIcon,
  Map as MapIcon,
  Globe as GlobeIcon,
  Earth,
  Moon as MoonIcon,
  Sun as SunIcon,
  Star as StarIcon,
  Comet,
  Rocket,
  Satellite as SatelliteIcon,
  Telescope,
  Binoculars,
  Camera2,
  Aperture,
  Focus,
  Zoom,
  ZoomIn,
  ZoomOut,
  Maximize,
  Minimize,
  Expand,
  Shrink,
  Move,
  RotateCw,
  RotateCcw,
  FlipHorizontal,
  FlipVertical,
  Crop,
  Scissors as ScissorsIcon,
  Copy as CopyIcon,
  Cut,
  Paste,
  Clipboard,
  ClipboardList,
  ClipboardCheck,
  ClipboardX,
  ClipboardCopy,
  ClipboardPaste,
  FileText as FileTextIcon,
  File as FileIcon,
  Folder as FolderIcon,
  FolderOpen as FolderOpenIcon,
  Archive as ArchiveIcon,
  Package as PackageIcon,
  Box,
  Container,
  Layers,
  Stack,
  Grid,
  List,
  Table,
  Columns,
  Rows,
  Layout,
  Sidebar,
  PanelLeft,
  PanelRight,
  PanelTop,
  PanelBottom,
  Split,
  Merge,
  Combine,
  Separate,
  Group,
  Ungroup,
  Align,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  AlignTop,
  AlignMiddle,
  AlignBottom,
  Distribute,
  DistributeHorizontal,
  DistributeVertical,
  Spacing,
  Margin,
  Padding,
  Border,
  BorderRadius,
  BorderStyle,
  BorderWidth,
  BorderColor,
  Background,
  Foreground,
  Color,
  Gradient,
  Pattern,
  Texture,
  Shadow,
  Blur,
  Brightness,
  Contrast,
  Saturation,
  Hue,
  Opacity,
  Transparency,
  Visibility,
  Hidden,
  Show,
  Hide,
  Toggle,
  Switch,
  Checkbox,
  Radio as RadioButton,
  Slider,
  Range,
  Progress,
  Loading,
  Spinner,
  Loader,
  Refresh,
  Sync,
  Update,
  Upgrade,
  Download as DownloadIcon,
  Upload as UploadIcon,
  Import,
  Export,
  Share,
  Link as LinkIcon,
  Unlink,
  Chain,
  Anchor as AnchorIcon,
  Bookmark as BookmarkIcon,
  Tag,
  Label as LabelIcon,
  Badge as BadgeIcon,
  Award as AwardIcon,
  Medal as MedalIcon,
  Trophy as TrophyIcon,
  Crown as CrownIcon,
  Shield as ShieldIcon,
  ShieldCheck as ShieldCheckIcon,
  ShieldAlert,
  ShieldX,
  Security,
  Lock2,
  Unlock2,
  Key2,
  Password,
  Fingerprint,
  Scan as ScanIcon,
  QrCode as QrCodeIcon,
  Barcode,
  Id,
  CreditCard2,
  Wallet as WalletIcon,
  Coins,
  Banknote,
  Receipt as ReceiptIcon,
  Calculator,
  Abacus,
  PiggyBank,
  Vault,
  Safe,
  Bank,
  Building,
  Building2,
  Home as HomeIcon,
  House,
  Castle,
  Church,
  School,
  University,
  Library,
  Museum,
  Theater,
  Cinema,
  Stadium,
  Store,
  Shop,
  Mall,
  Market,
  Warehouse,
  Factory,
  Office,
  Skyscraper,
  Tower,
  Bridge,
  Road,
  Highway,
  Street,
  Sidewalk,
  Crosswalk,
  TrafficLight,
  StopSign,
  ParkingMeter,
  GasStation,
  ChargingStation,
  Garage,
  Parking,
  Taxi,
  Bus as BusIcon,
  Train as TrainIcon,
  Subway,
  Tram,
  Monorail,
  Cable as CableCar,
  Gondola,
  Helicopter,
  Plane as PlaneIcon,
  Jet,
  Rocket as RocketIcon,
  Ufo,
  Parachute,
  Balloon,
  Kite,
  Glider,
  Hang,
  Paraglider,
  Skydiving,
  Bungee,
  Zipline,
  Climbing,
  Hiking,
  Walking,
  Running,
  Jogging,
  Sprinting,
  Marathon,
  Cycling,
  Biking,
  Motorcycle,
  Scooter,
  Skateboard,
  Rollerblade,
  Ski,
  Snowboard,
  Sled,
  Toboggan,
  IceSkate,
  RollerSkate,
  Surfboard,
  Wakeboard,
  Kiteboard,
  Windsurf,
  Sailboat,
  Yacht,
  Cruise,
  Ferry,
  Tugboat,
  Speedboat,
  Jetski,
  Kayak,
  Canoe,
  Raft,
  Paddleboard,
  Diving,
  Snorkeling,
  Swimming,
  WaterPolo,
  Volleyball,
  Basketball,
  Football,
  Soccer,
  Tennis,
  Badminton,
  TableTennis,
  Golf,
  Baseball,
  Softball,
  Cricket,
  Hockey,
  IceHockey,
  FieldHockey,
  Lacrosse,
  Rugby,
  AmericanFootball,
  Boxing,
  Wrestling,
  MartialArts,
  Karate,
  Judo,
  Taekwondo,
  Fencing,
  Archery,
  Shooting,
  Hunting,
  Fishing,
  Camping,
  Tent,
  Backpacking,
  Mountaineering,
  RockClimbing,
  Rappelling,
  Caving,
  Spelunking,
  Geocaching,
  Orienteering,
  Navigation2,
  Compass2,
  Map2,
  Gps,
  Coordinates,
  Location,
  Pin as PinIcon,
  Marker,
  Flag as FlagIcon,
  Checkpoint,
  Waypoint,
  Route as RouteIcon,
  Path,
  Trail,
  Track,
  Journey,
  Trip,
  Vacation,
  Holiday,
  Travel,
  Tourism,
  Sightseeing,
  Landmark,
  Monument,
  Statue,
  Fountain,
  Park,
  Garden,
  Forest,
  Jungle,
  Desert,
  Beach,
  Ocean,
  Sea,
  Lake,
  River,
  Stream,
  Waterfall,
  Geyser,
  HotSpring,
  Volcano,
  Mountain as MountainIcon,
  Hill,
  Valley,
  Canyon,
  Cave,
  Cliff,
  Rock,
  Stone,
  Pebble,
  Sand,
  Dirt,
  Grass,
  Flower as FlowerIcon,
  Tree,
  Bush,
  Shrub,
  Hedge,
  Vine,
  Moss,
  Fern,
  Cactus,
  Succulent,
  Bamboo,
  Palm,
  Pine,
  Oak,
  Maple,
  Birch,
  Willow,
  Cherry2,
  Apple2,
  Orange2,
  Lemon,
  Lime,
  Grapefruit,
  Peach,
  Pear,
  Plum,
  Apricot,
  Mango,
  Pineapple,
  Coconut,
  Avocado,
  Tomato,
  Cucumber,
  Pepper,
  Chili,
  Onion,
  Garlic,
  Ginger,
  Potato,
  SweetPotato,
  Carrot2,
  Radish,
  Turnip,
  Beet,
  Cabbage,
  Lettuce,
  Spinach,
  Kale,
  Broccoli,
  Cauliflower,
  Brussels,
  Asparagus,
  Celery,
  Leek,
  Scallion,
  Herb,
  Basil,
  Oregano,
  Thyme,
  Rosemary,
  Sage,
  Parsley,
  Cilantro,
  Dill,
  Mint,
  Lavender,
  Chamomile,
  Tea,
  Coffee2,
  Espresso,
  Cappuccino,
  Latte,
  Mocha,
  Macchiato,
  Americano,
  Frappuccino,
  IcedCoffee,
  ColdBrew,
  Decaf,
  Caffeine,
  Sugar,
  Honey,
  Syrup,
  Cream,
  Milk,
  Butter,
  Cheese,
  Yogurt,
  IceCream2,
  Sorbet,
  Gelato,
  Popsicle,
  Sundae,
  Milkshake,
  Smoothie,
  Juice,
  Soda,
  Water,
  Sparkling,
  Lemonade,
  Cocktail,
  Martini,
  Wine2,
  Champagne,
  Beer2,
  Whiskey,
  Vodka,
  Rum,
  Gin,
  Tequila,
  Brandy,
  Liqueur,
  Sake,
  Mead,
  Cider,
  Kombucha,
  Kefir,
  Probiotic,
  Vitamin,
  Supplement,
  Protein,
  Creatine,
  PreWorkout,
  PostWorkout,
  Recovery,
  Hydration,
  Electrolyte,
  Energy,
  Caffeine2,
  Stimulant,
  Nootropic,
  Adaptogen,
  Antioxidant,
  AntiInflammatory,
  Immune,
  Digestive,
  Probiotic2,
  Fiber,
  Omega3,
  Multivitamin,
  VitaminC,
  VitaminD,
  VitaminB,
  Iron,
  Calcium,
  Magnesium,
  Zinc,
  Potassium,
  Sodium,
  Chloride,
  Phosphorus,
  Sulfur,
  Iodine,
  Selenium,
  Copper,
  Manganese,
  Chromium,
  Molybdenum,
  Fluoride,
  Boron,
  Silicon,
  Vanadium,
  Nickel,
  Tin,
  Cobalt
} from 'lucide-react';

interface LoginFormData {
  email: string;
  password: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'blocked' | 'pending';
  balance: number;
  totalTransactions: number;
  lastLogin: string;
  socialName?: string;
  gender?: 'male' | 'female' | 'other';
}

interface Transaction {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  type: 'payment' | 'withdrawal' | 'refund';
  status: 'completed' | 'pending' | 'failed';
  method: 'card' | 'pix' | 'boleto';
  date: string;
  fee: number;
}

interface SystemConfig {
  globalFeePercentage: number;
  fixedFee: number;
  withdrawalEnabled: boolean;
  maintenanceMode: boolean;
  maxDailyWithdrawal: number;
  minWithdrawalAmount: number;
}

export default function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Login states
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Mock data
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'Ana Silva',
      email: 'ana@example.com',
      status: 'active',
      balance: 2500.00,
      totalTransactions: 45,
      lastLogin: '2024-01-15 14:30',
      socialName: 'Ana Beatriz',
      gender: 'female'
    },
    {
      id: '2',
      name: 'Carlos Santos',
      email: 'carlos@example.com',
      status: 'active',
      balance: 1800.50,
      totalTransactions: 32,
      lastLogin: '2024-01-15 12:15',
      gender: 'male'
    },
    {
      id: '3',
      name: 'Maria Oliveira',
      email: 'maria@example.com',
      status: 'blocked',
      balance: 0.00,
      totalTransactions: 12,
      lastLogin: '2024-01-10 09:45',
      socialName: 'Maria Fernanda',
      gender: 'female'
    }
  ]);

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 'tx_001',
      userId: '1',
      userName: 'Ana Silva',
      amount: 150.00,
      type: 'payment',
      status: 'completed',
      method: 'pix',
      date: '2024-01-15 14:25',
      fee: 4.50
    },
    {
      id: 'tx_002',
      userId: '2',
      userName: 'Carlos Santos',
      amount: 300.00,
      type: 'withdrawal',
      status: 'pending',
      method: 'card',
      date: '2024-01-15 13:10',
      fee: 9.00
    },
    {
      id: 'tx_003',
      userId: '1',
      userName: 'Ana Silva',
      amount: 75.00,
      type: 'payment',
      status: 'completed',
      method: 'boleto',
      date: '2024-01-15 11:30',
      fee: 2.25
    }
  ]);

  const [systemConfig, setSystemConfig] = useState<SystemConfig>({
    globalFeePercentage: 3.5,
    fixedFee: 2.00,
    withdrawalEnabled: true,
    maintenanceMode: false,
    maxDailyWithdrawal: 5000.00,
    minWithdrawalAmount: 50.00
  });

  // Stats
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'active').length;
  const totalBalance = users.reduce((sum, user) => sum + user.balance, 0);
  const totalTransactions = transactions.length;
  const todayRevenue = transactions
    .filter(t => t.date.startsWith('2024-01-15') && t.status === 'completed')
    .reduce((sum, t) => sum + t.fee, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setError('Email e senha são obrigatórios');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simular autenticação admin
      if (formData.email === 'admin@nichohot.com' && formData.password === 'admin123') {
        setCurrentUser({
          id: 'admin',
          name: 'Administrador',
          email: 'admin@nichohot.com',
          role: 'admin'
        });
        setIsLoggedIn(true);
      } else {
        setError('Credenciais inválidas');
      }
    } catch (err) {
      setError('Erro interno do servidor');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setFormData({ email: '', password: '' });
  };

  const toggleUserStatus = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'blocked' : 'active' }
        : user
    ));
  };

  const resetUserPassword = (userId: string) => {
    // Simular reset de senha
    alert(`Senha resetada para usuário ${userId}. Nova senha enviada por email.`);
  };

  const updateSystemConfig = (key: keyof SystemConfig, value: any) => {
    setSystemConfig(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Login Screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="shadow-2xl border-0 bg-white/10 backdrop-blur-md">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-white">Painel Administrativo</CardTitle>
              <CardDescription className="text-gray-300">
                Gateway de Pagamentos - Acesso Restrito
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {error && (
                <Alert className="border-red-500/50 bg-red-500/10">
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                  <AlertDescription className="text-red-400">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-200">
                    Email Administrativo
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="admin@nichohot.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-200">
                    Senha
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2.5"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Autenticando...</span>
                    </div>
                  ) : (
                    'Acessar Painel'
                  )}
                </Button>
              </form>

              <div className="text-center">
                <Button 
                  type="button"
                  variant="ghost" 
                  className="text-gray-300 hover:text-white text-sm"
                  onClick={() => setFormData({ email: 'admin@nichohot.com', password: 'admin123' })}
                >
                  Usar credenciais demo
                </Button>
              </div>

              <div className="text-center space-y-2">
                <div className="flex items-center justify-center space-x-4 text-xs text-gray-400">
                  <div className="flex items-center space-x-1">
                    <ShieldCheck className="h-3 w-3" />
                    <span>PCI-DSS</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Lock className="h-3 w-3" />
                    <span>SSL/TLS</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Globe className="h-3 w-3" />
                    <span>LGPD</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                <Shield className="h-4 w-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold">Gateway Admin</h1>
                <p className="text-xs text-muted-foreground">Painel de Controle</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="hidden sm:flex">
              <Activity className="h-3 w-3 mr-1" />
              Sistema Online
            </Badge>
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium">{currentUser?.name}</p>
                <p className="text-xs text-muted-foreground">Administrador</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r transition-transform duration-300 ease-in-out`}>
          <div className="flex flex-col h-full">
            <div className="p-4">
              <nav className="space-y-2">
                <Button
                  variant={activeTab === 'dashboard' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('dashboard')}
                >
                  <Home className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
                <Button
                  variant={activeTab === 'users' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('users')}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Usuários
                </Button>
                <Button
                  variant={activeTab === 'transactions' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('transactions')}
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Transações
                </Button>
                <Button
                  variant={activeTab === 'fees' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('fees')}
                >
                  <Percent className="h-4 w-4 mr-2" />
                  Taxas & Comissões
                </Button>
                <Button
                  variant={activeTab === 'withdrawals' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('withdrawals')}
                >
                  <Wallet className="h-4 w-4 mr-2" />
                  Saques
                </Button>
                <Button
                  variant={activeTab === 'reports' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('reports')}
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Relatórios
                </Button>
                <Button
                  variant={activeTab === 'integrations' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('integrations')}
                >
                  <Globe className="h-4 w-4 mr-2" />
                  Integrações
                </Button>
                <Button
                  variant={activeTab === 'security' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('security')}
                >
                  <ShieldCheck className="h-4 w-4 mr-2" />
                  Segurança
                </Button>
                <Button
                  variant={activeTab === 'settings' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('settings')}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Configurações
                </Button>
              </nav>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">Dashboard</h2>
                <p className="text-muted-foreground">Visão geral do sistema</p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Total de Usuários</p>
                        <p className="text-2xl font-bold">{totalUsers}</p>
                      </div>
                      <Users className="h-8 w-8 text-blue-600" />
                    </div>
                    <div className="mt-2 flex items-center text-sm">
                      <ArrowUpRight className="h-4 w-4 text-green-600 mr-1" />
                      <span className="text-green-600">+12%</span>
                      <span className="text-muted-foreground ml-1">vs mês anterior</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Usuários Ativos</p>
                        <p className="text-2xl font-bold">{activeUsers}</p>
                      </div>
                      <UserCheck className="h-8 w-8 text-green-600" />
                    </div>
                    <div className="mt-2 flex items-center text-sm">
                      <ArrowUpRight className="h-4 w-4 text-green-600 mr-1" />
                      <span className="text-green-600">+8%</span>
                      <span className="text-muted-foreground ml-1">vs mês anterior</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Saldo Total</p>
                        <p className="text-2xl font-bold">R$ {totalBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                      </div>
                      <DollarSign className="h-8 w-8 text-purple-600" />
                    </div>
                    <div className="mt-2 flex items-center text-sm">
                      <ArrowUpRight className="h-4 w-4 text-green-600 mr-1" />
                      <span className="text-green-600">+15%</span>
                      <span className="text-muted-foreground ml-1">vs mês anterior</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Receita Hoje</p>
                        <p className="text-2xl font-bold">R$ {todayRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-orange-600" />
                    </div>
                    <div className="mt-2 flex items-center text-sm">
                      <ArrowUpRight className="h-4 w-4 text-green-600 mr-1" />
                      <span className="text-green-600">+22%</span>
                      <span className="text-muted-foreground ml-1">vs ontem</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Transactions */}
              <Card>
                <CardHeader>
                  <CardTitle>Transações Recentes</CardTitle>
                  <CardDescription>Últimas movimentações do sistema</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {transactions.slice(0, 5).map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            transaction.type === 'payment' ? 'bg-green-100 text-green-600' :
                            transaction.type === 'withdrawal' ? 'bg-orange-100 text-orange-600' :
                            'bg-blue-100 text-blue-600'
                          }`}>
                            {transaction.type === 'payment' ? <ArrowDownRight className="h-5 w-5" /> :
                             transaction.type === 'withdrawal' ? <ArrowUpRight className="h-5 w-5" /> :
                             <RefreshCw className="h-5 w-5" />}
                          </div>
                          <div>
                            <p className="font-medium">{transaction.userName}</p>
                            <p className="text-sm text-muted-foreground">{transaction.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">R$ {transaction.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                          <Badge variant={
                            transaction.status === 'completed' ? 'default' :
                            transaction.status === 'pending' ? 'secondary' : 'destructive'
                          }>
                            {transaction.status === 'completed' ? 'Concluído' :
                             transaction.status === 'pending' ? 'Pendente' : 'Falhou'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Gestão de Usuários</h2>
                  <p className="text-muted-foreground">Controle total sobre contas de usuários</p>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Usuário
                </Button>
              </div>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Lista de Usuários</CardTitle>
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Buscar usuários..." className="pl-10 w-64" />
                      </div>
                      <Button variant="outline" size="sm">
                        <Filter className="h-4 w-4 mr-2" />
                        Filtros
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {users.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                            <User className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <p className="font-medium">{user.name}</p>
                              {user.socialName && (
                                <Badge variant="outline" className="text-xs">
                                  Nome Social: {user.socialName}
                                </Badge>
                              )}
                              {user.gender === 'female' && (
                                <Badge variant="secondary" className="text-xs bg-pink-100 text-pink-700">
                                  ♀ Feminino
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                            <p className="text-xs text-muted-foreground">Último acesso: {user.lastLogin}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="font-medium">R$ {user.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                            <p className="text-sm text-muted-foreground">{user.totalTransactions} transações</p>
                          </div>
                          <Badge variant={user.status === 'active' ? 'default' : 'destructive'}>
                            {user.status === 'active' ? 'Ativo' : 'Bloqueado'}
                          </Badge>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => toggleUserStatus(user.id)}
                            >
                              {user.status === 'active' ? <Ban className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => resetUserPassword(user.id)}
                            >
                              <Key className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'transactions' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">Transações</h2>
                <p className="text-muted-foreground">Monitoramento de todas as transações</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Total Hoje</p>
                        <p className="text-2xl font-bold">{transactions.filter(t => t.date.startsWith('2024-01-15')).length}</p>
                      </div>
                      <Activity className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Volume Hoje</p>
                        <p className="text-2xl font-bold">R$ {transactions
                          .filter(t => t.date.startsWith('2024-01-15'))
                          .reduce((sum, t) => sum + t.amount, 0)
                          .toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                      </div>
                      <DollarSign className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Taxa de Sucesso</p>
                        <p className="text-2xl font-bold">94.2%</p>
                      </div>
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Todas as Transações</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Exportar
                      </Button>
                      <Button variant="outline" size="sm">
                        <Filter className="h-4 w-4 mr-2" />
                        Filtros
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {transactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            transaction.method === 'pix' ? 'bg-green-100 text-green-600' :
                            transaction.method === 'card' ? 'bg-blue-100 text-blue-600' :
                            'bg-orange-100 text-orange-600'
                          }`}>
                            {transaction.method === 'pix' ? <Smartphone className="h-5 w-5" /> :
                             transaction.method === 'card' ? <CreditCard className="h-5 w-5" /> :
                             <FileText className="h-5 w-5" />}
                          </div>
                          <div>
                            <p className="font-medium">{transaction.id}</p>
                            <p className="text-sm text-muted-foreground">{transaction.userName}</p>
                            <p className="text-xs text-muted-foreground">{transaction.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">R$ {transaction.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                          <p className="text-sm text-muted-foreground">Taxa: R$ {transaction.fee.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                          <Badge variant={
                            transaction.status === 'completed' ? 'default' :
                            transaction.status === 'pending' ? 'secondary' : 'destructive'
                          }>
                            {transaction.status === 'completed' ? 'Concluído' :
                             transaction.status === 'pending' ? 'Pendente' : 'Falhou'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'fees' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">Taxas & Comissões</h2>
                <p className="text-muted-foreground">Configure as taxas do sistema</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Configurações Globais</CardTitle>
                    <CardDescription>Taxas aplicadas a todos os usuários</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="globalFee">Taxa Percentual Global (%)</Label>
                      <Input
                        id="globalFee"
                        type="number"
                        step="0.1"
                        value={systemConfig.globalFeePercentage}
                        onChange={(e) => updateSystemConfig('globalFeePercentage', parseFloat(e.target.value))}
                        className="mt-1"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Taxa aplicada sobre o valor de cada transação
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="fixedFee">Taxa Fixa (R$)</Label>
                      <Input
                        id="fixedFee"
                        type="number"
                        step="0.01"
                        value={systemConfig.fixedFee}
                        onChange={(e) => updateSystemConfig('fixedFee', parseFloat(e.target.value))}
                        className="mt-1"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Valor fixo cobrado por transação
                      </p>
                    </div>

                    <Button className="w-full">
                      <Save className="h-4 w-4 mr-2" />
                      Salvar Configurações
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Taxas por Método</CardTitle>
                    <CardDescription>Configure taxas específicas por método de pagamento</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <CreditCard className="h-5 w-5 text-blue-600" />
                          <div>
                            <p className="font-medium">Cartão de Crédito</p>
                            <p className="text-sm text-muted-foreground">Visa, Master, Amex</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">4.5%</p>
                          <p className="text-sm text-muted-foreground">+ R$ 0,30</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Smartphone className="h-5 w-5 text-green-600" />
                          <div>
                            <p className="font-medium">PIX</p>
                            <p className="text-sm text-muted-foreground">Pagamento instantâneo</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">1.5%</p>
                          <p className="text-sm text-muted-foreground">Mín. R$ 1,00</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-orange-600" />
                          <div>
                            <p className="font-medium">Boleto Bancário</p>
                            <p className="text-sm text-muted-foreground">Vencimento em 3 dias</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">R$ 3,50</p>
                          <p className="text-sm text-muted-foreground">Taxa fixa</p>
                        </div>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full">
                      <Edit className="h-4 w-4 mr-2" />
                      Editar Taxas
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Taxas Personalizadas por Usuário</CardTitle>
                  <CardDescription>Configure taxas específicas para usuários individuais</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Input placeholder="Buscar usuário..." className="flex-1" />
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar Taxa Personalizada
                      </Button>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                          </div>
                          <div>
                            <p className="font-medium">Ana Silva</p>
                            <p className="text-sm text-muted-foreground">ana@example.com</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="font-medium">2.5%</p>
                            <p className="text-sm text-muted-foreground">Taxa personalizada</p>
                          </div>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'withdrawals' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Controle de Saques</h2>
                  <p className="text-muted-foreground">Gerencie solicitações de saque</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={systemConfig.withdrawalEnabled ? 'default' : 'destructive'}>
                    {systemConfig.withdrawalEnabled ? 'Saques Habilitados' : 'Saques Bloqueados'}
                  </Badge>
                  <Button
                    variant={systemConfig.withdrawalEnabled ? 'destructive' : 'default'}
                    onClick={() => updateSystemConfig('withdrawalEnabled', !systemConfig.withdrawalEnabled)}
                  >
                    {systemConfig.withdrawalEnabled ? <Ban className="h-4 w-4 mr-2" /> : <CheckCircle className="h-4 w-4 mr-2" />}
                    {systemConfig.withdrawalEnabled ? 'Bloquear Saques' : 'Habilitar Saques'}
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Configurações de Saque</CardTitle>
                    <CardDescription>Defina limites e regras para saques</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="maxDaily">Limite Diário Máximo (R$)</Label>
                      <Input
                        id="maxDaily"
                        type="number"
                        value={systemConfig.maxDailyWithdrawal}
                        onChange={(e) => updateSystemConfig('maxDailyWithdrawal', parseFloat(e.target.value))}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="minWithdrawal">Valor Mínimo de Saque (R$)</Label>
                      <Input
                        id="minWithdrawal"
                        type="number"
                        value={systemConfig.minWithdrawalAmount}
                        onChange={(e) => updateSystemConfig('minWithdrawalAmount', parseFloat(e.target.value))}
                        className="mt-1"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="autoApprove"
                        className="rounded"
                      />
                      <Label htmlFor="autoApprove">Aprovação automática até R$ 1.000</Label>
                    </div>

                    <Button className="w-full">
                      <Save className="h-4 w-4 mr-2" />
                      Salvar Configurações
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Estatísticas de Saques</CardTitle>
                    <CardDescription>Resumo das movimentações</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 border rounded-lg">
                        <p className="text-2xl font-bold text-green-600">12</p>
                        <p className="text-sm text-muted-foreground">Aprovados Hoje</p>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <p className="text-2xl font-bold text-orange-600">3</p>
                        <p className="text-sm text-muted-foreground">Pendentes</p>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <p className="text-2xl font-bold text-red-600">1</p>
                        <p className="text-sm text-muted-foreground">Rejeitados</p>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <p className="text-2xl font-bold">R$ 8.5k</p>
                        <p className="text-sm text-muted-foreground">Volume Hoje</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Solicitações de Saque</CardTitle>
                  <CardDescription>Gerencie as solicitações pendentes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center">
                          <Clock className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">Ana Silva</p>
                          <p className="text-sm text-muted-foreground">Solicitado há 2 horas</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-medium">R$ 500,00</p>
                          <p className="text-sm text-muted-foreground">PIX</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm" className="text-green-600 border-green-600">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Aprovar
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 border-red-600">
                            <XCircle className="h-4 w-4 mr-1" />
                            Rejeitar
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center">
                          <Clock className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">Carlos Santos</p>
                          <p className="text-sm text-muted-foreground">Solicitado há 4 horas</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-medium">R$ 1.200,00</p>
                          <p className="text-sm text-muted-foreground">Transferência</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm" className="text-green-600 border-green-600">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Aprovar
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 border-red-600">
                            <XCircle className="h-4 w-4 mr-1" />
                            Rejeitar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'integrations' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">Integrações</h2>
                <p className="text-muted-foreground">Conecte com plataformas externas</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>OnlyFans Integration</CardTitle>
                    <CardDescription>Conecte com a plataforma OnlyFans</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-pink-100 text-pink-600 rounded-lg flex items-center justify-center">
                          <Heart className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">OnlyFans API</p>
                          <p className="text-sm text-muted-foreground">Status: Conectado</p>
                        </div>
                      </div>
                      <Badge variant="default">Ativo</Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>API Key</Label>
                      <div className="flex items-center space-x-2">
                        <Input type="password" value="••••••••••••••••" readOnly />
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Webhook URL</Label>
                      <div className="flex items-center space-x-2">
                        <Input value="https://gateway.nichohot.com/webhooks/onlyfans" readOnly />
                        <Button variant="outline" size="sm">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full">
                      <Settings className="h-4 w-4 mr-2" />
                      Configurar Integração
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Privacy.com Integration</CardTitle>
                    <CardDescription>Integração com Privacy para cartões virtuais</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                          <ShieldCheck className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">Privacy API</p>
                          <p className="text-sm text-muted-foreground">Status: Configurando</p>
                        </div>
                      </div>
                      <Badge variant="secondary">Pendente</Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>API Token</Label>
                      <div className="flex items-center space-x-2">
                        <Input placeholder="Insira o token da Privacy.com" />
                        <Button variant="outline" size="sm">
                          <Save className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Environment</Label>
                      <select className="w-full p-2 border rounded-md">
                        <option>Sandbox</option>
                        <option>Production</option>
                      </select>
                    </div>

                    <Button className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Ativar Integração
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Outras Integrações Disponíveis</CardTitle>
                  <CardDescription>Conecte com mais plataformas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-8 h-8 bg-red-100 text-red-600 rounded-lg flex items-center justify-center">
                          <Video className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">Chaturbate</p>
                          <p className="text-xs text-muted-foreground">Cam platform</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        Conectar
                      </Button>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center">
                          <Star className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">ManyVids</p>
                          <p className="text-xs text-muted-foreground">Content platform</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        Conectar
                      </Button>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-8 h-8 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
                          <DollarSign className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">Stripe</p>
                          <p className="text-xs text-muted-foreground">Payment processor</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        Conectar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">Configurações do Sistema</h2>
                <p className="text-muted-foreground">Configure parâmetros gerais do gateway</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Configurações Gerais</CardTitle>
                    <CardDescription>Parâmetros básicos do sistema</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Modo de Manutenção</p>
                        <p className="text-sm text-muted-foreground">Bloqueia novas transações</p>
                      </div>
                      <Button
                        variant={systemConfig.maintenanceMode ? 'destructive' : 'outline'}
                        size="sm"
                        onClick={() => updateSystemConfig('maintenanceMode', !systemConfig.maintenanceMode)}
                      >
                        {systemConfig.maintenanceMode ? 'Ativo' : 'Inativo'}
                      </Button>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Notificações por Email</p>
                        <p className="text-sm text-muted-foreground">Alertas para administradores</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Ativo
                      </Button>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Logs de Auditoria</p>
                        <p className="text-sm text-muted-foreground">Registro de todas as ações</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Ativo
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Nome Social</CardTitle>
                    <CardDescription>Configurações para nomes sociais femininos</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Permitir Nome Social</p>
                        <p className="text-sm text-muted-foreground">Usuários podem usar nome social</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Ativo
                      </Button>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Validação Automática</p>
                        <p className="text-sm text-muted-foreground">Verificar nomes femininos automaticamente</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Ativo
                      </Button>
                    </div>

                    <Separator />

                    <div>
                      <Label>Lista de Nomes Aprovados</Label>
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center justify-between p-2 border rounded">
                          <span className="text-sm">Ana, Maria, Carla, Beatriz, Fernanda</span>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Backup e Segurança</CardTitle>
                  <CardDescription>Configurações de backup e segurança dos dados</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <Database className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <p className="font-medium">Último Backup</p>
                      <p className="text-sm text-muted-foreground">Hoje às 03:00</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        <Download className="h-4 w-4 mr-1" />
                        Baixar
                      </Button>
                    </div>

                    <div className="text-center p-4 border rounded-lg">
                      <ShieldCheck className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <p className="font-medium">Certificado SSL</p>
                      <p className="text-sm text-muted-foreground">Válido até 2025</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Verificar
                      </Button>
                    </div>

                    <div className="text-center p-4 border rounded-lg">
                      <Key className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <p className="font-medium">Chaves API</p>
                      <p className="text-sm text-muted-foreground">12 ativas</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        <Settings className="h-4 w-4 mr-1" />
                        Gerenciar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}