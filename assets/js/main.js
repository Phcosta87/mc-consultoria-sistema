// =====================================
// 🚀 ARQUIVO PRINCIPAL - INICIALIZAÇÃO
// MC Consultoria - Sistema de Licitações
// =====================================

// Estado global da aplicação
const AppState = {
    currentPage: 1,
    totalItems: 0,
    pageSize: CONFIG.PAGINATION.ITEMS_PER_PAGE,
    currentSort: { column: 'abertura', order: 'desc' },
    searchInProgress: false,
    lastSearchTime: 0,
    allResults: [],
    filteredResults: [],
    activeFilters: {
        modalidades: [],
        tipologias: []
    },
    charts: {
        modalidade: null,
        tipologia: null
    },
    isInitialized: false
};

// Sistema de inicialização
const App = {
    // Inicializar aplicação
    async init() {
        Performance.start('App Initialization');
        Debug.log('🚀 Inicializando MC Consultoria Sistema de Licitações...', 'info');
        
        try {
            // Aguardar carregamento do DOM
            await this.waitForDOM();
            
            // Inicializar módulos na ordem correta
            this.initializeModules();
            
            // Configurar event listeners
            this.setupEventListeners();
            
            // Verificar conexão com N8N
            await this.checkConnection();
            
            // Tentar auto-login
            this.tryAutoLogin();
            
            // Finalizar inicialização
            this.completeInitialization();
            
        } catch (error) {
            this.handleInitializationError(error);
        }
    },
    
    // Aguardar carregamento do DOM
    waitForDOM() {
        return new Promise((resolve) => {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', resolve);
            } else {
                resolve();
            }
        });
    },
    
    // Inicializar módulos
    initializeModules() {
        Debug.log('📦 Inicializando módulos...', 'info');
        
        // Inicializar UI Manager
        if (typeof UI !== 'undefined') {
            UI.init();
            Debug.log('✅ UI Manager inicializado', 'success');
        }
        
        // Inicializar ícones Feather
        if (typeof feather !== 'undefined') {
            feather.replace();
            Debug.log('✅ Feather icons inicializados', 'success');
        }
        
        // Marcar módulos como carregados
        AppState.isInitialized = true;
    },
    
    // Configurar event listeners globais
    setupEventListeners() {
        Debug.log('🔗 Configurando event listeners globais...', 'info');
        
        // Form de login
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', handleLogin);
        }
        
        // Teclas de atalho globais
        this.setupGlobalKeyboardShortcuts();
        
        // Monitoramento de conexão
        this.setupConnectionMonitoring();
        
        // Resize handler
        this.setupResizeHandler();
        
        Debug.log('✅ Event listeners configurados', 'success');
    },
    
    // Configurar teclas de atalho globais
    setupGlobalKeyboardShortcuts() {
        document.addEventListener('keydown', (event) => {
            // Ctrl + Enter para pesquisar
            if (event.ctrlKey && event.key === 'Enter') {
                event.preventDefault();
                if (typeof pesquisarLicitacoes !== 'undefined') {
                    pesquisarLicitacoes();
                }
            }
            
            // F5 para refresh (se logado)
            if (event.key === 'F5' && Auth.isLoggedIn()) {
                event.preventDefault();
                if (typeof refreshResults !== 'undefined') {
                    refreshResults();
                }
            }
            
            // Ctrl + L para limpar filtros
            if (event.ctrlKey && event.key === 'l') {
                event.preventDefault();
                if (typeof clearFilters !== 'undefined') {
                    clearFilters();
                }
            }
        });
    },
    
    // Monitoramento de conexão
    setupConnectionMonitoring() {
        // Online/Offline events
        window.addEventListener('online', () => {
            UI.updateSystemStatus('Online', 'Conexão restaurada');
            Debug.log('🌐 Conexão restaurada', 'success');
        });
        
        window.addEventListener('offline', () => {
            UI.updateSystemStatus('Offline', 'Sem conexão com a internet');
            Debug.log('🚫 Conexão perdida', 'warning');
        });
    },
    
    // Handler para redimensionamento
    setupResizeHandler() {
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                if (typeof Charts !== 'undefined') {
                    Charts.resize();
                }
            }, 250);
        });
    },
    
    // Verificar conexão com N8N
    async checkConnection() {
        Debug.log('🔌 Verificando conexão com N8N...', 'info');
        
        const statusEl = document.getElementById('connectionStatus');
        const progressEl = document.getElementById('connectionProgress');
        
        try {
            if (statusEl) statusEl.textContent = 'Testando conexão...';
            if (progressEl) progressEl.style.width = '30%';
            
            Performance.start('Connection Test');
            
            const response = await fetch(CONFIG.ENDPOINTS.LOGIN, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ test: true }),
                signal: AbortSignal.timeout(5000)
            });
            
            Performance.end('Connection Test');
            if (progressEl) progressEl.style.width = '100%';
            
            if (response.ok || response.status === 400) {
                if (statusEl) {
                    statusEl.textContent = '✅ Conectado';
                    statusEl.className = 'text-sm font-medium text-green-700';
                }
                Debug.log('✅ Conexão com N8N estabelecida', 'success');
            } else {
                throw new Error(`Status: ${response.status}`);
            }
            
        } catch (error) {
            if (statusEl) {
                statusEl.textContent = '❌ Erro de Conexão';
                statusEl.className = 'text-sm font-medium text-red-700';
            }
            if (progressEl) progressEl.style.width = '0%';
            Debug.log(`❌ Erro de conexão: ${error.message}`, 'error');
        }
    },
    
    // Tentar auto-login
    tryAutoLogin() {
        if (typeof Auth !== 'undefined') {
            const autoLoginSuccess = Auth.autoLogin();
            if (autoLoginSuccess) {
                Debug.log('🔐 Auto-login realizado com sucesso', 'success');
            } else {
                Debug.log('🔐 Auto-login não disponível', 'info');
            }
        }
    },
    
    // Completar inicialização
    completeInitialization() {
        const duration = Performance.end('App Initialization');
        
        // Atualizar última atualização
        UI.updateLastUpdate();
        
        // Log final
        Debug.log('🎉 MC Consultoria Sistema inicializado com sucesso!', 'success', {
            tempo: `${duration.toFixed(2)}ms`,
            versao: '2.0.0',
            modulos: {
                config: typeof CONFIG !== 'undefined',
                debug: typeof Debug !== 'undefined',
                performance: typeof Performance !== 'undefined',
                ui: typeof UI !== 'undefined',
                auth: typeof Auth !== 'undefined',
                filterManager: typeof FilterManager !== 'undefined',
                search: typeof Search !== 'undefined',
                charts: typeof Charts !== 'undefined',
                pagination: typeof Pagination !== 'undefined'
            }
        });
        
        // Marcar performance
        Performance.mark('app-ready');
        
        // Remover loading se existir
        const loadingEl = document.getElementById('appLoading');
        if (loadingEl) {
            loadingEl.style.display = 'none';
        }
    },
    
    // Tratar erro de inicialização
    handleInitializationError(error) {
        Performance.end('App Initialization');
        Debug.error('❌ Erro na inicialização da aplicação:', error.message);
        
        // Mostrar erro na interface
        const errorContainer = document.createElement('div');
        errorContainer.className = 'fixed inset-0 bg-red-50 flex items-center justify-center z-50';
        errorContainer.innerHTML = `
            <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
                <div class="text-center">
                    <div class="text-red-500 text-6xl mb-4">⚠️</div>
                    <h2 class="text-xl font-bold text-gray-800 mb-2">Erro de Inicialização</h2>
                    <p class="text-gray-600 mb-4">Houve um problema ao carregar o sistema.</p>
                    <p class="text-sm text-gray-500 mb-6">${error.message}</p>
                    <button onclick="location.reload()" class="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors">
                        Recarregar Página
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(errorContainer);
    }
};

// =====================================
// 🎯 FUNÇÕES GLOBAIS UTILITÁRIAS
// =====================================

// Formatação de moeda brasileira para inputs
function formatarMoedaBR(input) {
    let valor = input.value.replace(/\D/g, '');
    
    if (!valor) {
        input.value = '';
        return;
    }
    
    valor = parseInt(valor) / 100;
    
    input.value = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(valor);
}

// Converter valor formatado para número
function converterParaNumero(valorFormatado) {
    if (!valorFormatado) return 0;
    
    const numeroLimpo = valorFormatado
        .replace(/[R$\s]/g, '')
        .replace(/\./g, '')
        .replace(',', '.');
    
    return parseFloat(numeroLimpo) || 0;
}

// Ordenar tabela
function sortTable(column) {
    const newOrder = (AppState.currentSort.column === column && AppState.currentSort.order === 'asc') ? 'desc' : 'asc';
    AppState.currentSort = { column, order: newOrder };
    
    // Atualizar ícones de ordenação
    document.querySelectorAll('.sort-header i').forEach(icon => {
        icon.setAttribute('data-feather', 'chevron-down');
    });
    
    const currentHeaderIcon = document.querySelector(`.sort-header[onclick="sortTable('${column}')"] i`);
    if (currentHeaderIcon) {
        currentHeaderIcon.setAttribute('data-feather', newOrder === 'asc' ? 'chevron-up' : 'chevron-down');
    }
    
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
    
    // Re-executar busca
    if (typeof pesquisarLicitacoes !== 'undefined') {
        pesquisarLicitacoes(1);
    }
}

// Exportar resultados
async function exportResults(format = 'csv') {
    Debug.log(`📤 Iniciando exportação em formato ${format}`, 'info');
    
    try {
        const filters = FilterManager ? FilterManager.getActiveFilters() : {};
        const exportUrl = `${CONFIG.ENDPOINTS.EXPORT}?format=${format}&sortBy=${AppState.currentSort.column}&sortOrder=${AppState.currentSort.order}&filters=${encodeURIComponent(JSON.stringify(filters))}`;
        
        window.open(exportUrl, '_blank');
        Debug.log(`✅ Exportação iniciada: ${format}`, 'success');
        
    } catch (error) {
        Debug.error(`❌ Erro na exportação: ${error.message}`);
        UI.showNotification(`Erro na exportação: ${error.message}`, 'error');
    }
}

// =====================================
// 🎬 INICIALIZAÇÃO AUTOMÁTICA
// =====================================

// Verificar se todos os scripts necessários foram carregados
function checkDependencies() {
    const requiredModules = ['CONFIG', 'Debug', 'Performance', 'UI', 'Auth'];
    const missingModules = requiredModules.filter(module => typeof window[module] === 'undefined');
    
    if (missingModules.length > 0) {
        console.error('❌ Módulos faltando:', missingModules);
        return false;
    }
    
    return true;
}

// Inicialização automática
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Verificar dependências
        if (!checkDependencies()) {
            throw new Error('Módulos obrigatórios não foram carregados');
        }
        
        // Inicializar aplicação
        await App.init();
        
    } catch (error) {
        console.error('❌ Erro crítico na inicialização:', error);
        
        // Fallback para erro crítico
        document.body.innerHTML = `
            <div class="min-h-screen bg-red-50 flex items-center justify-center">
                <div class="text-center p-8">
                    <h1 class="text-2xl font-bold text-red-600 mb-4">Erro Crítico</h1>
                    <p class="text-red-500 mb-4">${error.message}</p>
                    <button onclick="location.reload()" class="bg-red-600 text-white px-6 py-2 rounded">
                        Recarregar
                    </button>
                </div>
            </div>
        `;
    }
});

// Disponibilizar globalmente
window.AppState = AppState;
window.App = App;
window.formatarMoedaBR = formatarMoedaBR;
window.converterParaNumero = converterParaNumero;
window.sortTable = sortTable;
window.exportResults = exportResults;

console.log('✅ MAIN: Arquivo principal carregado - Sistema pronto para inicialização');
