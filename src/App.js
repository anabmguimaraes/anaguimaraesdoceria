import React from 'react';
import {
  LayoutDashboard, Users, ShoppingCart, Package, Calendar, Truck, DollarSign, BarChart3,
  Search, Bell, Menu, User, Settings, LogOut, Plus, TrendingUp, Heart, AlertTriangle,
  Clock, Star, Edit, Trash2, Eye, Download, Filter, X, Save, MessageCircle, Phone, Cake, Coffee, Cookie, Sparkles, Gift, ChevronLeft, ChevronRight, Printer, Home, BookOpen, Instagram, MapPin
} from 'lucide-react';

// Dados mockados para a aplicação (usados apenas na primeira vez que o app é aberto)
const mockData = {
  clientes: [
    { id: 1, nome: "Maria Silva", email: "maria@email.com", telefone: "(11) 99999-9999", endereco: "Rua das Flores, 123", totalCompras: 2500.00, ultimaCompra: "2024-08-15", status: "VIP", aniversario: "1985-09-15" },
    { id: 2, nome: "João Santos", email: "joao@email.com", telefone: "(11) 88888-8888", endereco: "Av. Paulista, 456", totalCompras: 1800.00, ultimaCompra: "2024-08-14", status: "Ativo", aniversario: "1990-07-20" },
    { id: 3, nome: "Ana Costa", email: "ana@email.com", telefone: "(11) 77777-7777", endereco: "Rua do Comércio, 789", totalCompras: 3200.00, ultimaCompra: "2024-08-10", status: "VIP", aniversario: "1988-12-03" }
  ],
  pedidos: [
    { id: 1001, cliente: "Maria Silva", produtos: [{productId: 1, nome: "Bolo de Chocolate", quantidade: 1, preco: 45.00}, {productId: 2, nome: "Torta de Morango", quantidade: 1, preco: 55.00}], total: 100.00, data: new Date().toISOString().split('T')[0], status: "Concluído", pagamento: "Cartão", tipo: "Pedido Normal", observacao: "" },
    { id: 1002, cliente: "João Santos", produtos: [{productId: 3, nome: "Cupcake Vanilla", quantidade: 6, preco: 7.50}], total: 45.00, data: new Date().toISOString().split('T')[0], status: "Pendente", pagamento: "PIX", tipo: "Pedido Normal", observacao: "Entregar na portaria." },
    { id: 1003, cliente: "Ana Costa", produtos: [{productId: 1, nome: "Bolo Aniversário", quantidade: 1, preco: 45.00}], total: 120.00, data: "2025-09-25", status: "Em Preparo", pagamento: "Dinheiro", tipo: "Aniversário", observacao: "Escrever 'Parabéns!'" }
  ],
  produtos: [
      { id: 1, nome: "Bolo de Chocolate", categoria: "Bolos", preco: 45.00, custo: 22.50, estoque: 15, status: "Ativo", descricao: "Delicioso bolo de chocolate com cobertura cremosa", tempoPreparo: "2 horas" },
      { id: 2, nome: "Torta de Morango", categoria: "Tortas", preco: 55.00, custo: 27.50, estoque: 8, status: "Ativo", descricao: "Torta fresca com morangos selecionados", tempoPreparo: "3 horas" },
      { id: 3, nome: "Cupcake Vanilla", categoria: "Cupcakes", preco: 7.50, custo: 3.75, estoque: 32, status: "Ativo", descricao: "Cupcake de baunilha com cobertura colorida", tempoPreparo: "30 minutos" },
      { id: 4, nome: "Brigadeiro Gourmet", categoria: "Doces", preco: 3.50, custo: 1.75, estoque: 5, status: "Baixo Estoque", descricao: "Brigadeiro artesanal com chocolate belga", tempoPreparo: "15 minutos" }
  ],
  fornecedores: [
    { id: 1, nome: "Doce Lar", contato: "Carlos Mendes", telefone: "(11) 3333-3333", email: "contato@docelar.com", produtos: "Ingredientes básicos", status: "Ativo" },
    { id: 2, nome: "Frutas & Cia", contato: "Ana Oliveira", telefone: "(11) 4444-4444", email: "vendas@frutasecia.com", produtos: "Frutas frescas", status: "Ativo" }
  ],
  despesas: [
      { id: 1, descricao: "Aluguel", valor: 1500.00, data: "2025-08-05", tipo: "Fixa" },
      { id: 2, descricao: "Ingredientes", valor: 350.00, data: "2025-08-10", tipo: "Variável" },
  ]
};

// Hook customizado para gerenciar o estado dos dados com persistência no localStorage
const useData = () => {
  const [data, setData] = React.useState(() => {
    try {
      const savedData = localStorage.getItem('doceriaCrmData');
      if (savedData) {
        let parsedData = JSON.parse(savedData);
        
        // --- LÓGICA DE MIGRAÇÃO DE DADOS ---
        // Garante que `pedidos.produtos` seja sempre um array
        if (parsedData.pedidos && parsedData.pedidos.some(p => p && typeof p.produtos === 'string')) {
            parsedData.pedidos = parsedData.pedidos.map(pedido => {
                if (pedido && typeof pedido.produtos === 'string') {
                    return { 
                        ...pedido, 
                        produtos: [{ 
                            nome: pedido.produtos, 
                            quantidade: 1, 
                            preco: pedido.total, 
                            productId: 0 // ID de placeholder
                        }] 
                    };
                }
                return pedido;
            });
        }
        return { ...mockData, ...parsedData };
      }
    } catch (error) {
      console.error("Erro ao carregar dados do localStorage:", error);
    }
    return mockData;
  });

  React.useEffect(() => {
    try {
      localStorage.setItem('doceriaCrmData', JSON.stringify(data));
    } catch (error) {
      console.error("Erro ao salvar dados no localStorage:", error);
    }
  }, [data]);


  const addItem = (section, item) => {
    setData(prev => {
        const newId = (prev[section] && prev[section].length > 0 ? Math.max(...prev[section].map(i => i.id)) : 0) + 1;
        const newItem = { ...item, id: newId };
        return {
            ...prev,
            [section]: [...(prev[section] || []), newItem]
        };
    });
  };

  const updateItem = (section, id, updatedItem) => {
    setData(prev => ({
      ...prev,
      [section]: prev[section].map(item =>
        item.id === id ? { ...item, ...updatedItem } : item
      )
    }));
  };

  const deleteItem = (section, id) => {
    setData(prev => ({
      ...prev,
      [section]: prev[section].filter(item => item.id !== id)
    }));
  };

  return { data, addItem, updateItem, deleteItem };
};

// Componentes de UI reutilizáveis
const Modal = ({ isOpen, onClose, title, children, size = "md" }) => {
  if (!isOpen) return null;
  const sizeClasses = { sm: "max-w-md", md: "max-w-lg", lg: "max-w-2xl", xl: "max-w-4xl" };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative bg-white rounded-2xl shadow-2xl w-full ${sizeClasses[size]} max-h-[90vh] flex flex-col`}>
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

const Button = ({ children, variant = "primary", size = "md", onClick, className = "", disabled = false, type = "button" }) => {
  const baseClasses = "font-medium rounded-xl transition-all flex items-center gap-2 justify-center";
  const variants = {
    primary: "bg-gradient-to-r from-pink-500 to-rose-600 text-white hover:from-pink-600 hover:to-rose-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
    secondary: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 shadow-md hover:shadow-lg",
    danger: "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl",
  };
  const sizes = { sm: "px-4 py-2 text-sm", md: "px-6 py-3", lg: "px-8 py-4 text-lg" };
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}>
      {children}
    </button>
  );
};

const Input = ({ label, error, className = "", ...props }) => (
  <div className="space-y-1">
    {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
    <input {...props} className={`w-full px-4 py-3 border rounded-xl transition-all focus:ring-2 focus:ring-pink-500 focus:border-transparent ${error ? 'border-red-300' : 'border-gray-300'} ${className}`} />
    {error && <p className="text-sm text-red-600">{error}</p>}
  </div>
);

const Textarea = ({ label, error, className = "", ...props }) => (
    <div className="space-y-1">
      {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
      <textarea {...props} className={`w-full px-4 py-3 border rounded-xl transition-all focus:ring-2 focus:ring-pink-500 focus:border-transparent ${error ? 'border-red-300' : 'border-gray-300'} ${className}`} />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
);

const Select = ({ label, error, className = "", children, ...props }) => (
    <div className="space-y-1">
      {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
      <select {...props} className={`w-full px-4 py-3 border rounded-xl transition-all focus:ring-2 focus:ring-pink-500 focus:border-transparent ${error ? 'border-red-300' : 'border-gray-300'} ${className}`}>
        {children}
      </select>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
);

const Table = ({ columns, data, actions = [] }) => (
  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="px-6 py-4 text-left text-sm font-semibold text-gray-700">{col.header}</th>
            ))}
            {actions.length > 0 && <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Ações</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {(data || []).map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gradient-to-r hover:from-pink-50/50 hover:to-rose-50/50 transition-all">
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="px-6 py-4 text-sm text-gray-900">
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
              {actions.length > 0 && (
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    {actions.map((action, actionIndex) => (
                      <button key={actionIndex} onClick={() => action.onClick(row)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title={action.label}>
                        <action.icon className="w-4 h-4 text-gray-600" />
                      </button>
                    ))}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// Componente principal da aplicação
function App() {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState('pagina-inicial');
  const { data, addItem, updateItem, deleteItem } = useData();
  const [confirmDelete, setConfirmDelete] = React.useState({ isOpen: false, section: null, id: null });
  const [generatedContent, setGeneratedContent] = React.useState({ isOpen: false, title: '', content: '' });
  const [isLoading, setIsLoading] = React.useState(false);
  const [lightboxImage, setLightboxImage] = React.useState(null);
  const [currentUserRole, setCurrentUserRole] = React.useState(null);
  const [showLogin, setShowLogin] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loginError, setLoginError] = React.useState('');

const handleLogin = () => {
    if (username === 'Administrador' && password === 'Administrador') {
        setCurrentUserRole('admin');
        setShowLogin(false);
        setCurrentPage('dashboard');
        setUsername('');
        setPassword('');
        setLoginError('');
    } else if (username === 'Visitante' && password === 'Visitante') {
        setCurrentUserRole('visitante');
        setShowLogin(false);
        setCurrentPage('pagina-inicial'); // ou 'dashboard', se preferir iniciar no dashboard
        setUsername('');
        setPassword('');
        setLoginError('');
    } else {
        setLoginError('Usuário ou senha inválidos.');
    }
};


  const handleLogout = () => {
      setCurrentUserRole(null);
      setCurrentPage('pagina-inicial');
  };

  // Função para chamar a API Gemini
  const callGeminiAPI = async (prompt) => {
    setIsLoading(true);
    try {
      const chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
      const payload = { contents: chatHistory };
      const apiKey = ""; // Deixe em branco, será fornecido pelo ambiente
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const result = await response.json();
      
      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        return result.candidates[0].content.parts[0].text;
      } else {
        return "Não foi possível gerar o conteúdo.";
      }
    } catch (error) {
      console.error("Erro ao chamar a API Gemini:", error);
      return "Ocorreu um erro ao tentar gerar o conteúdo.";
    } finally {
      setIsLoading(false);
    }
  };


  const handleDeleteRequest = (section, id) => {
    setConfirmDelete({ isOpen: true, section, id });
  };

  const executeDelete = () => {
    if (confirmDelete.section && confirmDelete.id) {
      deleteItem(confirmDelete.section, confirmDelete.id);
    }
    setConfirmDelete({ isOpen: false, section: null, id: null });
  };
  
const allMenuItems = [
  { id: 'pagina-inicial', label: 'Página Inicial', icon: Home, roles: ['admin', 'visitante'] },
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['admin', 'visitante'] },
  { id: 'clientes', label: 'Clientes', icon: Users, roles: ['admin', 'visitante'] },
  { id: 'pedidos', label: 'Pedidos', icon: ShoppingCart, roles: ['admin', 'visitante'] }, 
  { id: 'produtos', label: 'Produtos', icon: Package, roles: ['admin', 'visitante'] },
  { id: 'agenda', label: 'Agenda', icon: Calendar, roles: ['admin', 'visitante'] }, 
  { id: 'fornecedores', label: 'Fornecedores', icon: Truck, roles: ['admin', 'visitante'] },
  { id: 'relatorios', label: 'Relatórios', icon: BarChart3, roles: ['admin', 'visitante'] },
  { id: 'financeiro', label: 'Financeiro', icon: DollarSign, roles: ['admin'] }, // só admin
];

  
  const menuItems = allMenuItems.filter(item => item.roles.includes(currentUserRole));

  // Componente ImageSlider
  const ImageSlider = ({ images, onImageClick }) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = React.useCallback(() => {
        const isLastSlide = currentIndex === images.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }, [currentIndex, images]);

    React.useEffect(() => {
        const timer = setTimeout(nextSlide, 5000);
        return () => clearTimeout(timer);
    }, [currentIndex, nextSlide]);

    return (
        <div className="h-64 md:h-96 w-full m-auto relative group rounded-2xl overflow-hidden shadow-lg">
            <div style={{ backgroundImage: `url(${images[currentIndex]})` }} className="w-full h-full bg-center bg-cover duration-500 cursor-pointer" onClick={() => onImageClick(images[currentIndex])}></div>
            {/* Left Arrow */}
            <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
                <ChevronLeft onClick={prevSlide} size={30} />
            </div>
            {/* Right Arrow */}
            <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
                <ChevronRight onClick={nextSlide} size={30} />
            </div>
        </div>
    );
  };

  // Componente PaginaInicial
  const PaginaInicial = () => {
    const slideImages = [
        '/slide/slide1.png',
        '/slide/slide2.png',
        '/slide/slide3.png',
    ];

    return (
      <div className="p-6 space-y-6 bg-gradient-to-br from-pink-50/30 to-rose-50/30 min-h-screen">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">Página Inicial</h1>
            <p className="text-gray-600 mt-1">Seja bem-vindo à Ana Guimarães Doceria! É um prazer ter você em nosso cantinho doce da internet. Aqui começa sua experiência com os sabores que encantam e transformam momentos em memórias.</p>
          </div>
          <div className="flex gap-4">
              <Button onClick={() => window.open('/cardapio.html', '_blank')}><BookOpen className="w-4 h-4" /> Cardápio Delivery</Button>
              <Button onClick={() => window.open('/cardapio-festa.html', '_blank')}><Cake className="w-4 h-4" /> Cardápio de Festas</Button>
          </div>
        </div>
        
        <ImageSlider images={slideImages} onImageClick={setLightboxImage} />
        
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Sobre Nós</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <p className="text-gray-600 leading-relaxed mb-4">
                        Somos uma doceria apaixonada por criar momentos doces e inesquecíveis. Cada bolo, torta e doce é feito com ingredientes de alta qualidade e muito carinho, pensando em levar mais sabor para o seu dia.
                    </p>
                    <div className="space-y-3">
                        <a href="https://www.instagram.com/anaguimaraes.doceria/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-pink-600 font-semibold hover:underline">
                            <Instagram size={20} />
                            @anaguimaraes.doceria
                        </a>
                        <a href="https://wa.me/5562991056075" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-green-600 font-semibold hover:underline">
                            <MessageCircle size={20} />
                            (62) 99105-6075
                        </a>
                        <p className="flex items-center gap-2 text-gray-700">
                            <MapPin size={20} />
                            Av. Comercial, 433 - Jardim Nova Esperanca, Goiânia - GO
                        </p>
                    </div>
                    <div className="mt-4">
                        <h3 className="font-bold text-lg mb-2">Horário de Funcionamento:</h3>
                        <ul className="text-gray-600">
                            <li>Segunda a Sexta: 09:30 – 18:30</li>
                            <li>Sábado: 09:00 – 14:00</li>
                            <li>Domingo: Fechado</li>
                        </ul>
                    </div>
                </div>
                <div>
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3821.890300951331!2d-49.3274707!3d-16.6725019!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935ef50062f12789%3A0x5711296a03567da3!2sAna%20Guimar%C3%A3es%20doceria!5e0!3m2!1spt-BR!2sbr!4v1661282662551!5m2!1spt-BR!2sbr"
                        width="100%" 
                        height="300" 
                        style={{border:0}} 
                        allowFullScreen="" 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        className="rounded-lg shadow-md"
                    ></iframe>
                </div>
            </div>
        </div>
      </div>
    );
  };

  // Componente Dashboard
  const Dashboard = () => {
    const totalVendas = data.pedidos.reduce((acc, pedido) => acc + pedido.total, 0);
    const pedidosPendentes = data.pedidos.filter(p => p.status === 'Pendente').length;

    return (
      <div className="p-6 space-y-6 bg-gradient-to-br from-pink-50/30 to-rose-50/30 min-h-screen">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">Dashboard</h1>
            <p className="text-gray-600 mt-1">Visão geral da sua doceria</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all transform hover:-translate-y-1"><div className="flex items-center gap-4"><div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg"><TrendingUp className="w-6 h-6 text-white" /></div><div><p className="text-gray-500 text-sm font-medium">Vendas do dia</p><h2 className="text-2xl font-bold text-gray-800">R$ {totalVendas.toFixed(2)}</h2></div></div></div>
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all transform hover:-translate-y-1"><div className="flex items-center gap-4"><div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center shadow-lg"><Heart className="w-6 h-6 text-white" /></div><div><p className="text-gray-500 text-sm font-medium">Clientes ativos</p><h2 className="text-2xl font-bold text-gray-800">{data.clientes.length}</h2></div></div></div>
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all transform hover:-translate-y-1"><div className="flex items-center gap-4"><div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg"><Clock className="w-6 h-6 text-white" /></div><div><p className="text-gray-500 text-sm font-medium">Pedidos pendentes</p><h2 className="text-2xl font-bold text-gray-800">{pedidosPendentes}</h2></div></div></div>
        </div>
      </div>
    );
  };

  // Componente Clientes
  const Clientes = () => {
    const [searchTerm, setSearchTerm] = React.useState("");
    const [showModal, setShowModal] = React.useState(false);
    const [editingClient, setEditingClient] = React.useState(null);
    const [formData, setFormData] = React.useState({ nome: "", email: "", telefone: "", endereco: "", aniversario: "", status: "Ativo" });

    const filteredClients = data.clientes.filter(c => c.nome.toLowerCase().includes(searchTerm.toLowerCase()) || c.email.toLowerCase().includes(searchTerm.toLowerCase()));

    const resetForm = () => {
        setShowModal(false);
        setEditingClient(null);
        setFormData({ nome: "", email: "", telefone: "", endereco: "", aniversario: "", status: "Ativo" });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (editingClient) {
        updateItem('clientes', editingClient.id, formData);
      } else {
        addItem('clientes', { ...formData, totalCompras: 0, ultimaCompra: new Date().toISOString().split('T')[0] });
      }
      resetForm();
    };

    const handleEdit = (client) => {
      setEditingClient(client);
      setFormData(client);
      setShowModal(true);
    };

    const handleGenerateBirthdayMessage = async (client) => {
        const prompt = `Crie uma mensagem de aniversário curta e amigável para um cliente chamado ${client.nome}. O cliente tem o status "${client.status}" na nossa doceria. A mensagem deve ser calorosa e convidativa.`;
        const message = await callGeminiAPI(prompt);
        setGeneratedContent({ isOpen: true, title: `Mensagem para ${client.nome}`, content: message });
    };

    const columns = [
      { header: "Cliente", render: (row) => (<div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white font-bold shadow-md">{row.nome.charAt(0).toUpperCase()}</div><div><p className="font-semibold text-gray-800">{row.nome}</p><p className="text-sm text-gray-500">{row.email}</p></div></div>) },
      { header: "Telefone", render: (row) => (<div className="flex items-center gap-2"><Phone className="w-4 h-4 text-gray-400" /><span>{row.telefone}</span></div>) },
      { header: "Total Compras", render: (row) => (<span className="font-semibold text-green-600">R$ {row.totalCompras.toFixed(2)}</span>) },
      { header: "Última Compra", render: (row) => new Date(row.ultimaCompra).toLocaleDateString('pt-BR') },
      { header: "Status", render: (row) => (<span className={`px-3 py-1 rounded-full text-xs font-medium ${row.status === 'VIP' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}`}>{row.status}</span>) }
    ];
    const actions = [
      { icon: Sparkles, label: "Gerar Mensagem de Aniversário", onClick: handleGenerateBirthdayMessage },
      { icon: Eye, label: "Visualizar", onClick: (row) => console.log("Ver", row) },
      { icon: Edit, label: "Editar", onClick: handleEdit },
      { icon: Trash2, label: "Excluir", onClick: (row) => handleDeleteRequest('clientes', row.id) }
    ];

    return (
      <div className="p-6 space-y-6 bg-gradient-to-br from-pink-50/30 to-rose-50/30 min-h-screen">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">Gestão de Clientes</h1>
            <p className="text-gray-600 mt-1">Gerencie seus clientes e relacionamentos</p>
          </div>
          <Button onClick={() => setShowModal(true)}><Plus className="w-4 h-4" /> Novo Cliente</Button>
        </div>
        <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" placeholder="Buscar clientes..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent shadow-md" />
        </div>
        <Table columns={columns} data={filteredClients} actions={actions} />
        <Modal isOpen={showModal} onClose={resetForm} title={editingClient ? "Editar Cliente" : "Novo Cliente"} size="lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Nome Completo" type="text" value={formData.nome} onChange={(e) => setFormData({...formData, nome: e.target.value})} required />
              <Input label="Email" type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
              <Input label="Telefone" type="tel" value={formData.telefone} onChange={(e) => setFormData({...formData, telefone: e.target.value})} required />
              <Input label="Data de Aniversário" type="date" value={formData.aniversario} onChange={(e) => setFormData({...formData, aniversario: e.target.value})} />
            </div>
            <Input label="Endereço" type="text" value={formData.endereco} onChange={(e) => setFormData({...formData, endereco: e.target.value})} />
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="secondary" type="button" onClick={resetForm}>Cancelar</Button>
              <Button type="submit"><Save className="w-4 h-4" />{editingClient ? "Salvar" : "Criar Cliente"}</Button>
            </div>
          </form>
        </Modal>
      </div>
    );
  };

  // Componente Produtos
  const Produtos = () => {
    const [searchTerm, setSearchTerm] = React.useState("");
    const [showModal, setShowModal] = React.useState(false);
    const [editingProduct, setEditingProduct] = React.useState(null);
    const [formData, setFormData] = React.useState({ nome: "", categoria: "", preco: "", custo: "", estoque: "", status: "Ativo", descricao: "", tempoPreparo: "" });

    const filteredProducts = data.produtos.filter(p => p.nome.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const resetForm = () => {
        setShowModal(false);
        setEditingProduct(null);
        setFormData({ nome: "", categoria: "", preco: "", custo: "", estoque: "", status: "Ativo", descricao: "", tempoPreparo: "" });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const productData = { ...formData, preco: parseFloat(formData.preco), custo: parseFloat(formData.custo), estoque: parseInt(formData.estoque) };
      if (editingProduct) {
        updateItem('produtos', editingProduct.id, productData);
      } else {
        addItem('produtos', productData);
      }
      resetForm();
    };

    const handleEdit = (product) => {
      setEditingProduct(product);
      setFormData({ ...product, preco: String(product.preco), custo: String(product.custo), estoque: String(product.estoque) });
      setShowModal(true);
    };

    const handleGenerateDescription = async () => {
        if (!formData.nome || !formData.categoria) {
            alert("Por favor, preencha o nome e a categoria do produto primeiro.");
            return;
        }
        const prompt = `Crie uma descrição de produto curta e atraente para um(a) "${formData.nome}" da categoria "${formData.categoria}" de uma doceria. A descrição deve ser apetitosa e destacar a qualidade.`;
        const description = await callGeminiAPI(prompt);
        setFormData(prev => ({ ...prev, descricao: description }));
    };

    const columns = [
      { header: "Produto", render: (row) => (<div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-md">{row.categoria === 'Bolos' ? <Cake className="w-5 h-5 text-white" /> : <Cookie className="w-5 h-5 text-white" />}</div><div><p className="font-semibold text-gray-800">{row.nome}</p><p className="text-sm text-gray-500">{row.categoria}</p></div></div>) },
      { header: "Preço", render: (row) => <span className="font-semibold text-green-600">R$ {row.preco.toFixed(2)}</span> },
      { header: "Estoque", render: (row) => <span className={`font-medium ${row.estoque < 10 ? 'text-red-600' : 'text-gray-800'}`}>{row.estoque} un</span> },
      { header: "Status", render: (row) => <span className={`px-3 py-1 rounded-full text-xs font-medium ${row.status === 'Ativo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{row.status}</span> }
    ];
    const actions = [
        { icon: Eye, label: "Visualizar", onClick: (row) => console.log("Ver", row) },
        { icon: Edit, label: "Editar", onClick: handleEdit },
        { icon: Trash2, label: "Excluir", onClick: (row) => handleDeleteRequest('produtos', row.id) }
    ];

    return (
      <div className="p-6 space-y-6 bg-gradient-to-br from-pink-50/30 to-rose-50/30 min-h-screen">
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">Gestão de Produtos</h1>
                <p className="text-gray-600 mt-1">Gerencie seu cardápio e estoque</p>
            </div>
            <Button onClick={() => setShowModal(true)}><Plus className="w-4 h-4" /> Novo Produto</Button>
        </div>
        <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" placeholder="Buscar produtos..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent shadow-md" />
        </div>
        <Table columns={columns} data={filteredProducts} actions={actions} />
        <Modal isOpen={showModal} onClose={resetForm} title={editingProduct ? "Editar Produto" : "Novo Produto"} size="lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Nome do Produto" value={formData.nome} onChange={(e) => setFormData({...formData, nome: e.target.value})} required />
                <Input label="Categoria" value={formData.categoria} onChange={(e) => setFormData({...formData, categoria: e.target.value})} required />
                <Input label="Preço (R$)" type="number" step="0.01" value={formData.preco} onChange={(e) => setFormData({...formData, preco: e.target.value})} required />
                <Input label="Custo (R$)" type="number" step="0.01" value={formData.custo} onChange={(e) => setFormData({...formData, custo: e.target.value})} required />
                <Input label="Estoque" type="number" value={formData.estoque} onChange={(e) => setFormData({...formData, estoque: e.target.value})} required />
                <Input label="Tempo de Preparo" value={formData.tempoPreparo} onChange={(e) => setFormData({...formData, tempoPreparo: e.target.value})} />
            </div>
            <div className="relative">
                <Input label="Descrição" value={formData.descricao} onChange={(e) => setFormData({...formData, descricao: e.target.value})} />
                <Button size="sm" variant="secondary" onClick={handleGenerateDescription} disabled={isLoading} className="absolute right-2 bottom-2">
                    <Sparkles className="w-4 h-4" />
                    {isLoading ? 'Gerando...' : '✨ Gerar Descrição'}
                </Button>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="secondary" type="button" onClick={resetForm}>Cancelar</Button>
              <Button type="submit"><Save className="w-4 h-4" />{editingProduct ? "Salvar" : "Criar Produto"}</Button>
            </div>
          </form>
        </Modal>
      </div>
    );
  };

  // Componente Pedidos
  const Pedidos = () => {
    const [showModal, setShowModal] = React.useState(false);
    const [editingPedido, setEditingPedido] = React.useState(null);
    const [formData, setFormData] = React.useState({
        cliente: '',
        produtos: [],
        total: 0,
        pagamento: 'Cartão',
        status: 'Pendente',
        tipo: 'Pedido Normal',
        data: new Date().toISOString().split('T')[0],
        observacao: ''
    });

    const [produtoSelecionado, setProdutoSelecionado] = React.useState('');
    const [quantidadeProduto, setQuantidadeProduto] = React.useState(1);

    const resetForm = () => {
        setShowModal(false);
        setEditingPedido(null);
        setFormData({ cliente: '', produtos: [], total: 0, pagamento: 'Cartão', status: 'Pendente', tipo: 'Pedido Normal', data: new Date().toISOString().split('T')[0], observacao: '' });
    };
    
    React.useEffect(() => {
        if (Array.isArray(formData.produtos)) {
            const novoTotal = formData.produtos.reduce((acc, p) => acc + (p.preco * p.quantidade), 0);
            setFormData(prev => ({...prev, total: novoTotal}));
        }
    }, [formData.produtos]);

    const handleAddProduto = () => {
        if (!produtoSelecionado || quantidadeProduto <= 0) return;
        const produto = data.produtos.find(p => p.id === parseInt(produtoSelecionado));
        if (produto) {
            setFormData(prev => ({
                ...prev,
                produtos: [...prev.produtos, { ...produto, quantidade: quantidadeProduto, productId: produto.id }]
            }));
        }
    };

    const handleRemoveProduto = (productId) => {
        setFormData(prev => ({
            ...prev,
            produtos: prev.produtos.filter(p => p.productId !== productId)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const pedidoData = {
            ...formData,
            total: parseFloat(formData.total) || 0,
            produtos: formData.produtos.map(p => ({ productId: p.id, nome: p.nome, quantidade: p.quantidade, preco: p.preco }))
        };

        // Verifica se o cliente já existe, se não, cria um novo
        const clienteExistente = data.clientes.find(c => c.nome === pedidoData.cliente);
        if (!clienteExistente && pedidoData.cliente) {
            addItem('clientes', { 
                nome: pedidoData.cliente, 
                email: '', 
                telefone: '', 
                endereco: '', 
                totalCompras: 0, 
                ultimaCompra: new Date().toISOString().split('T')[0], 
                status: "Ativo", 
                aniversario: '' 
            });
        }

        if (editingPedido) {
            updateItem('pedidos', editingPedido.id, pedidoData);
        } else {
            addItem('pedidos', pedidoData);
        }
        resetForm();
    };

    const handleEdit = (pedido) => {
        setEditingPedido(pedido);
        setFormData(pedido);
        setShowModal(true);
    };

    const handlePrint = (pedido) => {
        const printWindow = window.open('', '_blank');
        const produtosHtml = Array.isArray(pedido.produtos)
            ? pedido.produtos.map(p => `
                <tr>
                    <td class="border-b p-2">${p.nome}</td>
                    <td class="border-b p-2">${p.quantidade}</td>
                    <td class="border-b p-2">R$ ${p.preco.toFixed(2)}</td>
                </tr>
            `).join('')
            : `<tr><td class="border-b p-2" colspan="3">${pedido.produtos}</td></tr>`;

        printWindow.document.write(`
            <html>
                <head>
                    <title>Pedido #${pedido.id}</title>
                    <script src="https://cdn.tailwindcss.com"></script>
                </head>
                <body class="font-sans p-8">
                    <div class="text-2xl font-bold mb-4">Pedido #${pedido.id}</div>
                    <div class="mb-4"><strong>Cliente:</strong> ${pedido.cliente}</div>
                    <div class="mb-4"><strong>Data:</strong> ${new Date(pedido.data).toLocaleDateString('pt-BR')}</div>
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <th class="border-b p-2">Produto</th>
                                <th class="border-b p-2">Qtd.</th>
                                <th class="border-b p-2">Preço</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${produtosHtml}
                        </tbody>
                    </table>
                    <div class="text-right mt-4 font-bold text-xl">Total: R$ ${parseFloat(pedido.total).toFixed(2)}</div>
                    <div class="mt-4"><strong>Observação:</strong> ${pedido.observacao || ''}</div>
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    };

    const columns = [
      { header: "Pedido", render: (row) => <div><p className="font-semibold">#{row.id}</p><p className="text-sm text-gray-500">{new Date(row.data).toLocaleDateString('pt-BR')}</p></div> },
      { header: "Cliente", key: "cliente" },
      { header: "Produtos", render: (row) => Array.isArray(row.produtos) ? row.produtos.map(p => `${p.nome} (x${p.quantidade})`).join(', ') : row.produtos },
      { header: "Total", render: (row) => <span className="font-semibold text-green-600">R$ {parseFloat(row.total).toFixed(2)}</span> },
      { header: "Pagamento", key: "pagamento" },
      { header: "Status", render: (row) => <span className={`px-3 py-1 rounded-full text-xs font-medium ${row.status === 'Concluído' ? 'bg-green-100 text-green-800' : row.status === 'Em Preparo' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>{row.status}</span> }
    ];
    const actions = [
      { icon: Printer, label: "Imprimir", onClick: handlePrint },
      { icon: Edit, label: "Editar", onClick: handleEdit },
      { icon: Trash2, label: "Excluir", onClick: (row) => handleDeleteRequest('pedidos', row.id) }
    ];
    return (
      <div className="p-6 space-y-6 bg-gradient-to-br from-pink-50/30 to-rose-50/30 min-h-screen">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">Gestão de Pedidos</h1>
            <p className="text-gray-600 mt-1">Acompanhe todos os pedidos</p>
          </div>
          <Button onClick={() => setShowModal(true)}><Plus className="w-4 h-4" /> Novo Pedido</Button>
        </div>
        <Table columns={columns} data={data.pedidos} actions={actions} />
        <Modal isOpen={showModal} onClose={resetForm} title={editingPedido ? "Editar Pedido" : "Novo Pedido"} size="xl">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input label="Cliente" list="clientes-lista" value={formData.cliente} onChange={(e) => setFormData({...formData, cliente: e.target.value})} required />
                    <datalist id="clientes-lista">
                        {data.clientes.map(c => <option key={c.id} value={c.nome} />)}
                    </datalist>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Produtos</label>
                        <div className="flex items-center gap-2 mt-1">
                            <Select className="flex-grow" onChange={(e) => setProdutoSelecionado(e.target.value)}>
                                <option value="">Selecione um produto</option>
                                {data.produtos.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
                            </Select>
                            <Input type="number" className="w-20" value={quantidadeProduto} onChange={(e) => setQuantidadeProduto(parseInt(e.target.value))} min="1" />
                            <Button type="button" onClick={handleAddProduto}><Plus/></Button>
                        </div>
                        <div className="mt-2 space-y-2">
                            {Array.isArray(formData.produtos) && formData.produtos.map((p, index) => (
                                <div key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded-lg">
                                    <span>{p.nome} (x{p.quantidade})</span>
                                    <button type="button" onClick={() => handleRemoveProduto(p.productId)}><Trash2 className="w-4 h-4 text-red-500"/></button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Input label="Total (R$)" type="number" step="0.01" value={formData.total.toFixed(2)} readOnly />
                    <Select label="Tipo de Pedido" value={formData.tipo} onChange={(e) => setFormData({...formData, tipo: e.target.value})}>
                        <option>Pedido Normal</option>
                        <option>Aniversário</option>
                        <option>Casamento</option>
                        <option>Evento</option>
                    </Select>
                    {formData.tipo !== 'Pedido Normal' && (
                        <Input label="Data de Entrega" type="date" value={formData.data} onChange={(e) => setFormData({...formData, data: e.target.value})} />
                    )}
                     <Select label="Forma de Pagamento" value={formData.pagamento} onChange={(e) => setFormData({...formData, pagamento: e.target.value})}>
                        <option>Cartão</option>
                        <option>PIX</option>
                        <option>Dinheiro</option>
                    </Select>
                    <Select label="Status do Pedido" value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
                        <option>Pendente</option>
                        <option>Em Preparo</option>
                        <option>Concluído</option>
                        <option>Cancelado</option>
                    </Select>
                </div>
                <Textarea label="Observação" rows="3" value={formData.observacao} onChange={(e) => setFormData({...formData, observacao: e.target.value})} />
                <div className="flex justify-end gap-3 pt-4">
                    <Button variant="secondary" type="button" onClick={resetForm}>Cancelar</Button>
                    <Button type="submit"><Save className="w-4 h-4" />{editingPedido ? "Salvar" : "Criar Pedido"}</Button>
                </div>
            </form>
        </Modal>
      </div>
    );
  };
  
  // Componente Agenda
  const Agenda = () => {
    const [currentDate, setCurrentDate] = React.useState(new Date());
    const [selectedDate, setSelectedDate] = React.useState(new Date());

    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startDay = startOfMonth.getDay();
    const daysInMonth = endOfMonth.getDate();

    const pedidosPorDia = data.pedidos.reduce((acc, pedido) => {
        const dataPedido = new Date(pedido.data).toDateString();
        if(!acc[dataPedido]) {
            acc[dataPedido] = [];
        }
        acc[dataPedido].push(pedido);
        return acc;
    }, {});

    const diasDoCalendario = [];
    for (let i = 0; i < startDay; i++) {
        diasDoCalendario.push(<div key={`empty-${i}`} className="border rounded-lg p-2 h-24"></div>);
    }
    for (let i = 1; i <= daysInMonth; i++) {
        const dia = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
        const temPedido = pedidosPorDia[dia.toDateString()];
        const isToday = dia.toDateString() === new Date().toDateString();
        const isSelected = dia.toDateString() === selectedDate.toDateString();

        diasDoCalendario.push(
            <div 
                key={i} 
                className={`border rounded-lg p-2 h-24 flex flex-col cursor-pointer transition-all ${isToday ? 'bg-pink-100' : ''} ${isSelected ? 'ring-2 ring-pink-500' : ''}`}
                onClick={() => setSelectedDate(dia)}
            >
                <span className={`font-semibold ${isToday ? 'text-pink-600' : ''}`}>{i}</span>
                {temPedido && <div className="mt-auto flex justify-end"><Cake className="w-4 h-4 text-pink-500"/></div>}
            </div>
        );
    }

    const pedidosDoDiaSelecionado = pedidosPorDia[selectedDate.toDateString()] || [];

    return (
        <div className="p-6 space-y-6 bg-gradient-to-br from-pink-50/30 to-rose-50/30 min-h-screen">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">Agenda</h1>
                    <p className="text-gray-600 mt-1">Visualize seus pedidos no calendário</p>
                </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <div className="flex justify-between items-center mb-4">
                    <Button variant="secondary" onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}><ChevronLeft/></Button>
                    <h2 className="text-xl font-semibold">{currentDate.toLocaleString('pt-BR', { month: 'long', year: 'numeric' })}</h2>
                    <Button variant="secondary" onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}><ChevronRight/></Button>
                </div>
                <div className="grid grid-cols-7 gap-2 text-center font-semibold text-gray-600 mb-2">
                    <div>Dom</div><div>Seg</div><div>Ter</div><div>Qua</div><div>Qui</div><div>Sex</div><div>Sáb</div>
                </div>
                <div className="grid grid-cols-7 gap-2">
                    {diasDoCalendario}
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Pedidos para {selectedDate.toLocaleDateString('pt-BR')}</h3>
                {pedidosDoDiaSelecionado.length > 0 ? (
                    <div className="space-y-2">
                        {pedidosDoDiaSelecionado.map(pedido => (
                            <div key={pedido.id} className="p-2 border rounded-lg flex justify-between">
                                <span>{pedido.cliente} - {Array.isArray(pedido.produtos) ? pedido.produtos.map(p => p.nome).join(', ') : pedido.produtos}</span>
                                <span className={`px-2 py-0.5 rounded-full text-xs ${pedido.status === 'Concluído' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{pedido.status}</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">Nenhum pedido para esta data.</p>
                )}
            </div>
        </div>
    );
  };

  // Componente Financeiro
  const Financeiro = () => {
    const [showModal, setShowModal] = React.useState(false);
    const [editingDespesa, setEditingDespesa] = React.useState(null);
    const [formData, setFormData] = React.useState({ descricao: '', valor: '', data: new Date().toISOString().split('T')[0], tipo: 'Variável' });

    const resetForm = () => {
        setShowModal(false);
        setEditingDespesa(null);
        setFormData({ descricao: '', valor: '', data: new Date().toISOString().split('T')[0], tipo: 'Variável' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingDespesa) {
            updateItem('despesas', editingDespesa.id, { ...formData, valor: parseFloat(formData.valor) });
        } else {
            addItem('despesas', { ...formData, valor: parseFloat(formData.valor) });
        }
        resetForm();
    };
    
    const handleEdit = (despesa) => {
        setEditingDespesa(despesa);
        setFormData({ ...despesa, valor: String(despesa.valor) });
        setShowModal(true);
    };

    // Cálculos Financeiros
    const today = new Date();
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const threeMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 3, 1);

    const vendasHoje = (data.pedidos || []).filter(p => new Date(p.data).toDateString() === today.toDateString() && p.status === 'Concluído').reduce((acc, p) => acc + p.total, 0);
    const vendasUltimoMes = (data.pedidos || []).filter(p => new Date(p.data) >= lastMonth && p.status === 'Concluído').reduce((acc, p) => acc + p.total, 0);
    const vendasUltimos3Meses = (data.pedidos || []).filter(p => new Date(p.data) >= threeMonthsAgo && p.status === 'Concluído').reduce((acc, p) => acc + p.total, 0);
    const totalDespesas = (data.despesas || []).reduce((acc, d) => acc + d.valor, 0);
    const caixa = vendasUltimos3Meses - totalDespesas; // Simplificado

    const columns = [
        { header: "Descrição", key: "descricao" },
        { header: "Valor", render: (row) => <span className="text-red-600">R$ {row.valor.toFixed(2)}</span> },
        { header: "Data", render: (row) => new Date(row.data).toLocaleDateString('pt-BR') },
        { header: "Tipo", key: "tipo" },
    ];
    
    const actions = [
        { icon: Edit, label: "Editar", onClick: handleEdit },
        { icon: Trash2, label: "Excluir", onClick: (row) => handleDeleteRequest('despesas', row.id) }
    ];

    return (
        <div className="p-6 space-y-6 bg-gradient-to-br from-pink-50/30 to-rose-50/30 min-h-screen">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">Financeiro</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-lg"><p className="text-gray-500">Vendas do Dia</p><h2 className="text-2xl font-bold">R$ {vendasHoje.toFixed(2)}</h2></div>
                <div className="bg-white p-6 rounded-2xl shadow-lg"><p className="text-gray-500">Vendas do Mês</p><h2 className="text-2xl font-bold">R$ {vendasUltimoMes.toFixed(2)}</h2></div>
                <div className="bg-white p-6 rounded-2xl shadow-lg"><p className="text-gray-500">Vendas (3 Meses)</p><h2 className="text-2xl font-bold">R$ {vendasUltimos3Meses.toFixed(2)}</h2></div>
                <div className="bg-white p-6 rounded-2xl shadow-lg"><p className="text-green-800">Caixa</p><h2 className="text-2xl font-bold text-green-800">R$ {caixa.toFixed(2)}</h2></div>
            </div>
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-700">Despesas</h2>
                <Button onClick={() => setShowModal(true)}><Plus/> Nova Despesa</Button>
            </div>
            <Table columns={columns} data={data.despesas || []} actions={actions} />
            <Modal isOpen={showModal} onClose={resetForm} title={editingDespesa ? "Editar Despesa" : "Nova Despesa"}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input label="Descrição" value={formData.descricao} onChange={e => setFormData({...formData, descricao: e.target.value})} required/>
                    <Input label="Valor (R$)" type="number" step="0.01" value={formData.valor} onChange={e => setFormData({...formData, valor: e.target.value})} required/>
                    <Input label="Data" type="date" value={formData.data} onChange={e => setFormData({...formData, data: e.target.value})} required/>
                    <Select label="Tipo" value={formData.tipo} onChange={e => setFormData({...formData, tipo: e.target.value})}>
                        <option>Variável</option>
                        <option>Fixa</option>
                    </Select>
                    <div className="flex justify-end gap-3 pt-4">
                        <Button variant="secondary" onClick={resetForm}>Cancelar</Button>
                        <Button type="submit">{editingDespesa ? "Salvar" : "Adicionar"}</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
  };

  // Componente Relatórios
  const Relatorios = () => {
    // Dados para os gráficos
    const vendasMensais = {
        labels: ['Jun', 'Jul', 'Ago'],
        datasets: [{
            label: 'Vendas Mensais',
            data: [1200, 1900, 3000],
            backgroundColor: 'rgba(236, 72, 153, 0.5)',
            borderColor: 'rgba(236, 72, 153, 1)',
            borderWidth: 1
        }]
    };

    const produtosMaisVendidos = {
        labels: ['Bolo de Chocolate', 'Torta de Morango', 'Cupcakes'],
        datasets: [{
            data: [30, 50, 20],
            backgroundColor: ['#EC4899', '#F9A8D4', '#FDF2F8'],
            hoverBackgroundColor: ['#D93782', '#F472B6', '#FCE7F3']
        }]
    };

    return (
        <div className="p-6 space-y-6 bg-gradient-to-br from-pink-50/30 to-rose-50/30 min-h-screen">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">Relatórios</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <h2 className="text-xl font-bold text-gray-700 mb-4">Vendas por Mês</h2>
                    {/* Placeholder para gráfico de barras */}
                    <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                        <p className="text-gray-500">Gráfico de Vendas Mensais</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <h2 className="text-xl font-bold text-gray-700 mb-4">Produtos Mais Vendidos</h2>
                    {/* Placeholder para gráfico de pizza */}
                    <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                        <p className="text-gray-500">Gráfico de Produtos</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <h2 className="text-xl font-bold text-gray-700 mb-4">Clientes que Mais Compram</h2>
                    <Table
                        columns={[
                            { header: 'Cliente', key: 'nome' },
                            { header: 'Total Gasto', render: (row) => `R$ ${row.totalCompras.toFixed(2)}` }
                        ]}
                        data={[...data.clientes].sort((a, b) => b.totalCompras - a.totalCompras).slice(0, 5)}
                    />
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <h2 className="text-xl font-bold text-gray-700 mb-4">Despesas por Categoria</h2>
                    <Table
                        columns={[
                            { header: 'Tipo', key: 'tipo' },
                            { header: 'Total', render: (row) => `R$ ${row.total.toFixed(2)}` }
                        ]}
                        data={[
                            { tipo: 'Fixa', total: data.despesas.filter(d => d.tipo === 'Fixa').reduce((acc, d) => acc + d.valor, 0) },
                            { tipo: 'Variável', total: data.despesas.filter(d => d.tipo === 'Variável').reduce((acc, d) => acc + d.valor, 0) }
                        ]}
                    />
                </div>
            </div>
        </div>
    );
  };


  // Placeholder para páginas em desenvolvimento
  const PlaceholderPage = ({ title }) => (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-pink-600">{title}</h1>
      <p className="text-gray-600 mt-2">Funcionalidade em desenvolvimento...</p>
    </div>
  );

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'pagina-inicial': return <PaginaInicial />;
      case 'dashboard': return <Dashboard />;
      case 'clientes': return <Clientes />;
      case 'pedidos': return <Pedidos />;
      case 'produtos': return <Produtos />;
      case 'agenda': return <Agenda />;
      case 'fornecedores': return <PlaceholderPage title="Fornecedores" />;
      case 'financeiro': return <Financeiro />;
      case 'relatorios': return <Relatorios />;
      default: return <PaginaInicial />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white shadow-lg flex flex-col transition-all duration-300`}>
        <div className="flex items-center justify-between p-4 border-b h-16">
          <img src="logotipo.png" alt="Logotipo Ana Doceria" className={`h-8 transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`} />
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg hover:bg-pink-50">
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <button key={item.id} onClick={() => setCurrentPage(item.id)} className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors ${currentPage === item.id ? 'bg-pink-100 text-pink-700' : 'hover:bg-pink-50 text-gray-700'} ${!sidebarOpen ? 'justify-center' : ''}`}>
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t">
          <button className={`w-full flex items-center gap-3 p-2 rounded-lg hover:bg-pink-50 text-gray-700 ${!sidebarOpen ? 'justify-center' : ''}`}>
            <Settings className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && 'Configurações'}
          </button>
          <button onClick={handleLogout} className={`w-full flex items-center gap-3 p-2 rounded-lg hover:bg-pink-50 text-gray-700 ${!sidebarOpen ? 'justify-center' : ''}`}>
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && 'Sair'}
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between p-4 bg-white shadow-sm h-16">
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
            <Search className="w-4 h-4 text-gray-500" />
            <input type="text" placeholder="Buscar..." className="bg-transparent outline-none text-sm" />
          </div>
          <div className="flex items-center gap-4">
            <Bell className="w-5 h-5 text-gray-600 cursor-pointer" />
            <User className="w-6 h-6 text-gray-600 cursor-pointer" onClick={() => setShowLogin(true)} />
          </div>
        </div>
        <main className="flex-1 overflow-y-auto">
            {renderCurrentPage()}
        </main>
      </div>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Login</h2>
            <input 
              type="text" 
              placeholder="Usuário" 
              className="w-full border p-2 rounded mb-3" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input 
              type="password" 
              placeholder="Senha" 
              className="w-full border p-2 rounded mb-3" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {loginError && <p className="text-red-500 text-sm mb-3">{loginError}</p>}
            <div className="flex justify-end gap-2">
              <button 
                onClick={() => setShowLogin(false)} 
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancelar
              </button>
              <button onClick={handleLogin} className="px-4 py-2 bg-pink-600 text-white rounded">
                Entrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmação de Exclusão */}
      <Modal isOpen={confirmDelete.isOpen} onClose={() => setConfirmDelete({ isOpen: false, section: null, id: null })} title="Confirmar Exclusão" size="sm">
        <div className="space-y-6">
            <p className="text-gray-600">Tem certeza que deseja excluir este item? Esta ação não pode ser desfeita.</p>
            <div className="flex justify-end gap-3">
                <Button variant="secondary" onClick={() => setConfirmDelete({ isOpen: false, section: null, id: null })}>Cancelar</Button>
                <Button variant="danger" onClick={executeDelete}>Excluir</Button>
            </div>
        </div>
      </Modal>

      {/* Modal para Conteúdo Gerado */}
      <Modal isOpen={generatedContent.isOpen} onClose={() => setGeneratedContent({ isOpen: false, title: '', content: '' })} title={generatedContent.title} size="md">
        <div className="space-y-4">
            <p className="text-gray-700 whitespace-pre-wrap">{generatedContent.content}</p>
            <div className="flex justify-end">
                <Button onClick={() => setGeneratedContent({ isOpen: false, title: '', content: '' })}>Fechar</Button>
            </div>
        </div>
      </Modal>
      
      {/* Lightbox para Imagens */}
      {lightboxImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80" onClick={() => setLightboxImage(null)}>
            <img src={lightboxImage} alt="Visualização Ampliada" className="max-w-full max-h-full rounded-lg"/>
        </div>
      )}
    </div>
  );
}

export default App;
