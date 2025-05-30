<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>01-config.js - Configurações MC Consultoria</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;600&display=swap" rel="stylesheet">
    <style>
        * { font-family: 'Inter', sans-serif; }
        .code-font { font-family: 'JetBrains Mono', monospace; }
        .gradient-bg { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
        .glass-card { 
            background: rgba(255, 255, 255, 0.95); 
            backdrop-filter: blur(20px); 
            border: 1px solid rgba(255, 255, 255, 0.2); 
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.1); 
        }
        .code-block {
            background: #1e1e1e;
            color: #d4d4d4;
            border-radius: 12px;
            padding: 20px;
            overflow-x: auto;
            font-size: 14px;
            line-height: 1.6;
        }
        .keyword { color: #569cd6; }
        .string { color: #ce9178; }
        .comment { color: #6a9955; font-style: italic; }
        .number { color: #b5cea8; }
        .property { color: #9cdcfe; }
        .section-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            font-weight: 700;
        }
        .fade-in { animation: fadeIn 0.6s ease-in; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    </style>
</head>
<body class="gradient-bg min-h-screen py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="glass-card rounded-3xl p-8 mb-8 fade-in">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold section-header mb-2">
                        <i class="fas fa-cog mr-3"></i>01-config.js
                    </h1>
                    <p class="text-gray-600 text-lg">Configurações Centralizadas - Sistema MC Consultoria</p>
                    <div class="flex items-center mt-4 space-x-6">
                        <div class="flex items-center text-sm text-gray-500">
                            <i class="fas fa-server mr-2 text-blue-500"></i>
                            <span>Endpoints Atualizados</span>
                        </div>
                        <div class="flex items-center text-sm text-gray-500">
                            <i class="fas fa-database mr-2 text-green-500"></i>
                            <span>Nova Estrutura de Dados</span>
                        </div>
                        <div class="flex items-center text-sm text-gray-500">
                            <i class="fas fa-filter mr-2 text-purple-500"></i>
                            <span>Filtros Expandidos</span>
                        </div>
                    </div>
                </div>
                <div class="text-right">
                    <div class="text-2xl font-bold text-blue-600">v2.0</div>
                    <div class="text-sm text-gray-500">MC Consultoria</div>
                </div>
            </div>
        </div>

        <!-- Arquivo JavaScript -->
        <div class="glass-card rounded-2xl p-6 mb-8 fade-in">
            <div class="flex items-center justify-between mb-6">
                <h2 class="text-xl font-semibold text-gray-800">
                    <i class="fas fa-file-code mr-2 text-blue-500"></i>
                    Arquivo de Configuração
                </h2>
                <div class="flex space-x-2">
                    <button onclick="copyToClipboard()" class="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors">
                        <i class="fas fa-copy mr-2"></i>Copiar Código
                    </button>
                    <button onclick="downloadFile()" class="px-4 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition-colors">
                        <i class="fas fa-download mr-2"></i>Download
                    </button>
                </div>
            </div>
            
            <div class="code-block code-font" id="configCode">
<span class="comment">// =====================================</span>
<span class="comment">// 🔧 CONFIGURAÇÕES MC CONSULTORIA - v2.0</span>
<span class="comment">// Arquivo: 01-config.js</span>
<span class="comment">// =====================================</span>

<span class="keyword">const</span> <span class="property">CONFIG</span> = {
    <span class="comment">// 🌐 ENDPOINTS ATUALIZADOS</span>
    <span class="property">ENDPOINTS</span>: {
        <span class="property">FRONTEND</span>: <span class="string">'https://n8n.mcconsultoria.shop/webhook/produto1'</span>,
        <span class="property">LOGIN</span>: <span class="string">'https://n8n.mcconsultoria.shop/webhook/loginproduto1'</span>,
        <span class="property">CONSULTA</span>: <span class="string">'https://n8n.mcconsultoria.shop/webhook/consultaproduto1'</span>,
        <span class="property">EXPORT</span>: <span class="string">'https://n8n.mcconsultoria.shop/webhook/exportproduto1'</span>
    },
    
    <span class="comment">// 🗄️ CONFIGURAÇÕES DE BANCO DE DADOS</span>
    <span class="property">DATABASE</span>: {
        <span class="property">TABLE</span>: <span class="string">'editais_mc'</span>,
        <span class="property">TIPOLOGIA_FIELD</span>: <span class="string">'tipologia_oficial'</span>,
        <span class="property">FIELDS</span>: {
            <span class="comment">// Campos principais</span>
            <span class="property">ID</span>: <span class="string">'id'</span>,
            <span class="property">EDITAL</span>: <span class="string">'edital'</span>,
            <span class="property">MODALIDADE</span>: <span class="string">'modalidade'</span>,
            <span class="property">COMPRADOR</span>: <span class="string">'comprador'</span>,
            <span class="property">OBJETO</span>: <span class="string">'objeto'</span>,
            <span class="property">VALOR</span>: <span class="string">'valor'</span>,
            <span class="property">ABERTURA</span>: <span class="string">'abertura'</span>,
            <span class="property">TIPOLOGIA</span>: <span class="string">'tipologia_oficial'</span>,
            <span class="property">LINK</span>: <span class="string">'link_edital'</span>,
            
            <span class="comment">// Campos expandidos</span>
            <span class="property">ESTADO</span>: <span class="string">'estado'</span>,
            <span class="property">MUNICIPIO</span>: <span class="string">'municipio'</span>,
            <span class="property">MODO_DISPUTA</span>: <span class="string">'modo_disputa'</span>,
            <span class="property">ANO_COMPRA</span>: <span class="string">'ano_compra'</span>,
            <span class="property">CONTROLE_PNCP</span>: <span class="string">'controle_pncp'</span>,
            <span class="property">NUMERO_COMPRA_ORGAO</span>: <span class="string">'numero_compra_orgao'</span>,
            <span class="property">CREATED_AT</span>: <span class="string">'created_at'</span>,
            <span class="property">UPDATED_AT</span>: <span class="string">'updated_at'</span>
        }
    },
    
    <span class="comment">// 🔍 CONFIGURAÇÕES DE FILTROS</span>
    <span class="property">FILTERS</span>: {
        <span class="comment">// Filtros básicos (originais)</span>
        <span class="property">BASIC</span>: [
            <span class="string">'modalidades'</span>, 
            <span class="string">'tipologias'</span>, 
            <span class="string">'dataInicio'</span>, 
            <span class="string">'dataFim'</span>, 
            <span class="string">'valorMinimo'</span>, 
            <span class="string">'valorMaximo'</span>, 
            <span class="string">'estado'</span>
        ],
        
        <span class="comment">// 🆕 NOVOS FILTROS EXPANDIDOS</span>
        <span class="property">EXTENDED</span>: [
            <span class="string">'municipio'</span>,
            <span class="string">'modo_disputa'</span>,
            <span class="string">'ano_compra'</span>,
            <span class="string">'controle_pncp'</span>,
            <span class="string">'numero_compra_orgao'</span>
        ],
        
        <span class="comment">// Filtros combinados</span>
        <span class="property">ALL</span>: [],  <span class="comment">// Será populado dinamicamente</span>
        
        <span class="comment">// Configurações de filtros especiais</span>
        <span class="property">CONFIG</span>: {
            <span class="property">MULTIPLE_SELECTION</span>: [<span class="string">'modalidades'</span>, <span class="string">'tipologias'</span>],
            <span class="property">DATE_FIELDS</span>: [<span class="string">'dataInicio'</span>, <span class="string">'dataFim'</span>],
            <span class="property">NUMERIC_FIELDS</span>: [<span class="string">'valorMinimo'</span>, <span class="string">'valorMaximo'</span>, <span class="string">'ano_compra'</span>],
            <span class="property">TEXT_FIELDS</span>: [<span class="string">'municipio'</span>, <span class="string">'controle_pncp'</span>, <span class="string">'numero_compra_orgao'</span>],
            <span class="property">SELECT_FIELDS</span>: [<span class="string">'estado'</span>, <span class="string">'modo_disputa'</span>]
        }
    },
    
    <span class="comment">// 📊 ESTATÍSTICAS EXPANDIDAS</span>
    <span class="property">STATS</span>: {
        <span class="property">BASIC</span>: [
            <span class="string">'totalLicitacoes'</span>,
            <span class="string">'valorTotal'</span>, 
            <span class="string">'valorMedio'</span>, 
            <span class="string">'totalCompradores'</span>
        ],
        <span class="property">EXTENDED</span>: [
            <span class="string">'totalMunicipios'</span>,
            <span class="string">'totalEstados'</span>,
            <span class="string">'totalModosDisputa'</span>,
            <span class="string">'totalAnos'</span>,
            <span class="string">'anoMaisAntigo'</span>,
            <span class="string">'anoMaisRecente'</span>
        ]
    },
    
    <span class="comment">// 📄 PAGINAÇÃO</span>
    <span class="property">PAGINATION</span>: {
        <span class="property">ITEMS_PER_PAGE</span>: <span class="number">25</span>,
        <span class="property">MAX_VISIBLE_PAGES</span>: <span class="number">5</span>,
        <span class="property">SHOW_PAGINATION_THRESHOLD</span>: <span class="number">25</span>
    },
    
    <span class="comment">// ⏱️ TIMEOUTS</span>
    <span class="property">TIMEOUTS</span>: {
        <span class="property">LOGIN</span>: <span class="number">15000</span>,
        <span class="property">SEARCH</span>: <span class="number">30000</span>,
        <span class="property">EXPORT</span>: <span class="number">60000</span>,
        <span class="property">CONNECTION_TEST</span>: <span class="number">5000</span>
    },
    
    <span class="comment">// 🎨 CONFIGURAÇÕES DE INTERFACE</span>
    <span class="property">UI</span>: {
        <span class="property">ANIMATION_DURATION</span>: <span class="number">300</span>,
        <span class="property">DEBOUNCE_DELAY</span>: <span class="number">500</span>,
        <span class="property">TOAST_DURATION</span>: <span class="number">5000</span>,
        <span class="property">LOADING_MIN_DURATION</span>: <span class="number">800</span>,
        <span class="property">THEME</span>: {
            <span class="property">PRIMARY_GRADIENT</span>: <span class="string">'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'</span>,
            <span class="property">SECONDARY_GRADIENT</span>: <span class="string">'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'</span>,
            <span class="property">SUCCESS_GRADIENT</span>: <span class="string">'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'</span>
        }
    },
    
    <span class="comment">// 🐛 DEBUG E PERFORMANCE</span>
    <span class="property">DEBUG</span>: <span class="keyword">true</span>,
    <span class="property">PERFORMANCE_TRACKING</span>: <span class="keyword">true</span>,
    <span class="property">LOG_LEVEL</span>: <span class="string">'info'</span>, <span class="comment">// 'error', 'warning', 'info', 'debug'</span>
    <span class="property">MAX_LOG_ENTRIES</span>: <span class="number">150</span>,
    
    <span class="comment">// 📊 CONFIGURAÇÕES DE GRÁFICOS</span>
    <span class="property">CHARTS</span>: {
        <span class="property">COLORS</span>: [
            <span class="string">'#667eea'</span>, <span class="string">'#764ba2'</span>, <span class="string">'#f093fb'</span>, <span class="string">'#f5576c'</span>,
            <span class="string">'#4facfe'</span>, <span class="string">'#00f2fe'</span>, <span class="string">'#43e97b'</span>, <span class="string">'#38f9d7'</span>,
            <span class="string">'#FF6384'</span>, <span class="string">'#36A2EB'</span>, <span class="string">'#FFCE56'</span>, <span class="string">'#4BC0C0'</span>
        ],
        <span class="property">DEFAULT_HEIGHT</span>: <span class="number">300</span>,
        <span class="property">ANIMATION_DURATION</span>: <span class="number">1000</span>
    },
    
    <span class="comment">// 🔐 CONFIGURAÇÕES DE SEGURANÇA</span>
    <span class="property">SECURITY</span>: {
        <span class="property">MAX_LOGIN_ATTEMPTS</span>: <span class="number">3</span>,
        <span class="property">LOCKOUT_DURATION</span>: <span class="number">300000</span>, <span class="comment">// 5 minutos</span>
        <span class="property">SESSION_TIMEOUT</span>: <span class="number">3600000</span> <span class="comment">// 1 hora</span>
    }
};

<span class="comment">// 🔧 INICIALIZAÇÃO DE CONFIGURAÇÕES DINÂMICAS</span>
<span class="property">CONFIG</span>.<span class="property">FILTERS</span>.<span class="property">ALL</span> = [...<span class="property">CONFIG</span>.<span class="property">FILTERS</span>.<span class="property">BASIC</span>, ...<span class="property">CONFIG</span>.<span class="property">FILTERS</span>.<span class="property">EXTENDED</span>];

<span class="comment">// 🌍 EXPORTAR CONFIGURAÇÕES</span>
<span class="keyword">if</span> (<span class="keyword">typeof</span> module !== <span class="string">'undefined'</span> && module.exports) {
    module.exports = <span class="property">CONFIG</span>;
} <span class="keyword">else</span> <span class="keyword">if</span> (<span class="keyword">typeof</span> window !== <span class="string">'undefined'</span>) {
    window.<span class="property">CONFIG</span> = <span class="property">CONFIG</span>;
}

<span class="comment">// 📝 LOG DE INICIALIZAÇÃO</span>
console.log(<span class="string">'🚀 Configurações MC Consultoria carregadas'</span>, {
    version: <span class="string">'2.0'</span>,
    endpoints: Object.keys(<span class="property">CONFIG</span>.<span class="property">ENDPOINTS</span>).length,
    filtros: <span class="property">CONFIG</span>.<span class="property">FILTERS</span>.<span class="property">ALL</span>.length,
    debug: <span class="property">CONFIG</span>.<span class="property">DEBUG</span>
});
            </div>
        </div>

        <!-- Documentação -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <!-- Endpoints -->
            <div class="glass-card rounded-2xl p-6 fade-in">
                <h3 class="text-lg font-semibold text-gray-800 mb-4">
                    <i class="fas fa-server mr-2 text-blue-500"></i>Endpoints Configurados
                </h3>
                <div class="space-y-3">
                    <div class="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <span class="text-sm font-medium text-blue-800">Frontend</span>
                        <code class="text-xs text-blue-600">webhook/produto1</code>
                    </div>
                    <div class="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <span class="text-sm font-medium text-green-800">Login</span>
                        <code class="text-xs text-green-600">webhook/loginproduto1</code>
                    </div>
                    <div class="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                        <span class="text-sm font-medium text-purple-800">Consulta</span>
                        <code class="text-xs text-purple-600">webhook/consultaproduto1</code>
                    </div>
                    <div class="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                        <span class="text-sm font-medium text-orange-800">Export</span>
                        <code class="text-xs text-orange-600">webhook/exportproduto1</code>
                    </div>
                </div>
            </div>

            <!-- Novos Filtros -->
            <div class="glass-card rounded-2xl p-6 fade-in">
                <h3 class="text-lg font-semibold text-gray-800 mb-4">
                    <i class="fas fa-filter mr-2 text-purple-500"></i>Novos Filtros Expandidos
                </h3>
                <div class="grid grid-cols-2 gap-3">
                    <div class="p-3 bg-gray-50 rounded-lg text-center">
                        <i class="fas fa-map-marker-alt text-red-500 mb-2"></i>
                        <div class="text-sm font-medium">Município</div>
                        <code class="text-xs text-gray-500">municipio</code>
                    </div>
                    <div class="p-3 bg-gray-50 rounded-lg text-center">
                        <i class="fas fa-gavel text-blue-500 mb-2"></i>
                        <div class="text-sm font-medium">Modo Disputa</div>
                        <code class="text-xs text-gray-500">modo_disputa</code>
                    </div>
                    <div class="p-3 bg-gray-50 rounded-lg text-center">
                        <i class="fas fa-calendar text-green-500 mb-2"></i>
                        <div class="text-sm font-medium">Ano Compra</div>
                        <code class="text-xs text-gray-500">ano_compra</code>
                    </div>
                    <div class="p-3 bg-gray-50 rounded-lg text-center">
                        <i class="fas fa-barcode text-purple-500 mb-2"></i>
                        <div class="text-sm font-medium">Controle PNCP</div>
                        <code class="text-xs text-gray-500">controle_pncp</code>
                    </div>
                </div>
            </div>
        </div>

        <!-- Status -->
        <div class="glass-card rounded-2xl p-6 text-center fade-in">
            <div class="flex items-center justify-center space-x-6">
                <div class="flex items-center text-green-600">
                    <i class="fas fa-check-circle mr-2"></i>
                    <span class="font-medium">Configurações Atualizadas</span>
                </div>
                <div class="flex items-center text-blue-600">
                    <i class="fas fa-database mr-2"></i>
                    <span class="font-medium">Base: editais_mc</span>
                </div>
                <div class="flex items-center text-purple-600">
                    <i class="fas fa-cogs mr-2"></i>
                    <span class="font-medium">Pronto para Módulos</span>
                </div>
            </div>
        </div>
    </div>

    <script>
        function copyToClipboard() {
            const code = document.getElementById('configCode').textContent;
            navigator.clipboard.writeText(code).then(() => {
                showToast('Código copiado para a área de transferência!', 'success');
            });
        }

        function downloadFile() {
            const code = document.getElementById('configCode').textContent;
            const blob = new Blob([code], { type: 'text/javascript' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = '01-config.js';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            showToast('Arquivo baixado com sucesso!', 'success');
        }

        function showToast(message, type = 'info') {
            const toast = document.createElement('div');
            toast.className = `fixed top-4 right-4 p-4 rounded-lg text-white z-50 ${
                type === 'success' ? 'bg-green-500' : 
                type === 'error' ? 'bg-red-500' : 'bg-blue-500'
            }`;
            toast.innerHTML = `
                <div class="flex items-center">
                    <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'times' : 'info'}-circle mr-2"></i>
                    ${message}
                </div>
            `;
            document.body.appendChild(toast);
            
            setTimeout(() => {
                toast.style.opacity = '0';
                setTimeout(() => document.body.removeChild(toast), 300);
            }, 3000);
        }

        // Inicialização
        document.addEventListener('DOMContentLoaded', function() {
            console.log('🔧 Visualizador de configurações carregado');
        });
    </script>
</body>
</html>