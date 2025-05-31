// =====================================
// 🚀 ARQUIVO PRINCIPAL - INICIALIZAÇÃO
// MC Consultoria - Sistema de Licitações
// =====================================

// Estado global da aplicação
const AppState = {
    currentPage: 1,
    totalItems: 0,
    pageSize: 25, // Usando valor padrão
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
        if (typeof Performance !== 'undefined') {
            Performance.start('App Initialization');
        }
        
        Debug.log('🚀 Inicializando MC Consultoria Sistema de Licitações...', 'info');
        
        try {
            // Aguardar carregamento do DOM
            await this.waitForDOM();
            
            // Verificar CONFIG
            this.validateConfig();
            
            // Inicializar módulos na ordem correta
            this.initializeModules();
            
            // Configurar event listeners
            this.setupEventListeners();
            
            // Verificar conexão com N8N
            await this.checkConnection();
            
            // Tentar auto-login (usando seu sistema Auth)
            this.tryAutoLogin();
            
            // Finalizar inicialização
            this.completeInitialization();
            
        } catch (error) {
            this.handleInitializationError(error);
        }
    },
    
    // Validar configuração
    validateConfig() {
        if (!window.CONFIG) {
            throw new Error('CONFIG não encontrado');
        }
        
        // Definir pageSize baseado na configuração
        if (CONFIG.PAGINATION && CONFIG.PAGINATION.ITEMS_PER_PAGE) {
            AppState.pageSize = CONFIG.PAGINATION.ITEMS_PER_PAGE;
        }
        
        Debug.log('✅ CONFIG validado', 'success', CONFIG);
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
        if (typeof UI !== 'undefined' && typeof UI.init === 'function') {
            UI.init();
            Debug.log('✅ UI Manager inicializado', 'success');
        }
        
        // Inicializar FilterManager
        if (typeof FilterManager !== 'undefined' && typeof FilterManager.init === 'function') {
            FilterManager.init();
            Debug.log('✅ FilterManager inicializado', 'success');
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
        
        // Form de login (já tratado pelo seu Auth através do handleLogin global)
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            // Verificar se já não tem listener
            if (!loginForm.hasAttribute('data-listener-added')) {
                loginForm.addEventListener('submit', window.handleLogin);
                loginForm.setAttribute('data-listener-added', 'true');
            }
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
            if (typeof UI !== 'undefined' && typeof UI.updateSystemStatus === 'function') {
                UI.updateSystemStatus('Online', 'Conexão restaurada');
            }
            Debug.log('🌐 Conexão restaurada', 'success');
        });
        
        window.addEventListener('offline', () => {
            if (typeof UI !== 'undefined' && typeof UI.updateSystemStatus === 'function') {
                UI.updateSystemStatus('Offline', 'Sem conexão com a internet');
            }
            Debug.log('🚫 Conexão perdida', 'warning');
        });
    },
    
    // Handler para redimensionamento
    setupResizeHandler() {
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                if (typeof Charts !== 'undefined' && typeof Charts.resize === 'function') {
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
            if (statusEl) statusEl.textContent = 'Verificando...';
            if (progressEl) progressEl.style.width = '25%';
            
            // Usar endpoint de teste ou frontend
            const testUrl = CONFIG.ENDPOINTS.FRONTEND;
            
            // Testar conexão com timeout
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 8000);
            
            if (progressEl) progressEl.style.width = '50%';
            
            const response = await fetch(testUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'test-connection',
                    timestamp: new Date().toISOString()
                }),
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            if (progressEl) progressEl.style.width = '75%';
            
            if (response.ok) {
                if (statusEl) {
                    statusEl.textContent = '✅ Conectado';
                    statusEl.className = 'text-sm font-medium text-green-700';
                }
                if (progressEl) progressEl.style.width = '100%';
                Debug.log('✅ Conexão com N8N estabelecida', 'success');
                return true;
            } else {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
        } catch (error) {
            if (statusEl) {
                statusEl.textContent = '❌ Erro de Conexão';
                statusEl.className = 'text-sm font-medium text-red-700';
            }
            if (progressEl) progressEl.style.width = '0%';
            
            if (error.name === 'AbortError') {
                Debug.log('⏱️ Timeout na conexão com N8N', 'warning');
            } else {
                Debug.log(`❌ Erro na conexão com N8N: ${error.message}`, 'error');
            }
            
            // Tentar modo offline/fallback
            this.enableOfflineMode();
            return false;
        }
    },
    
    // Modo offline/fallback
    enableOfflineMode() {
        Debug.log('📴 Ativando modo offline', 'warning');
        const statusEl = document.getElementById('connectionStatus');
        if (statusEl) {
            statusEl.textContent = '📴 Modo Offline';
            statusEl.className = 'text-sm font-medium text-yellow-700';
        }
    },
    
    // Tentar auto-login usando seu sistema Auth
    tryAutoLogin() {
        if (typeof Auth !== 'undefined' && typeof Auth.autoLogin === 'function') {
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
        let duration = 0;
        if (typeof Performance !== 'undefined') {
            duration = Performance.end('App Initialization');
        }
        
        // Atualizar última atualização
        if (typeof UI !== 'undefined' && typeof UI.updateLastUpdate === 'function') {
            UI.updateLastUpdate();
        }
        
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
        if (typeof Performance !== 'undefined') {
            Performance.mark('app-ready');
        }
        
        // Remover loading se existir
        const loadingEl = document.getElementById('appLoading');
        if (loadingEl) {
            loadingEl.style.display = 'none';
        }
    },
    
    // Tratar erro de inicialização
    handleInitializationError(error) {
        if (typeof Performance !== 'undefined') {
            Performance.end('App Initialization');
        }
        
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
    // Verificar autenticação usando seu sistema
    if (!Auth.isLoggedIn()) {
        Debug.warning('Tentativa de exportação sem autenticação');
        return;
    }
    
    Debug.log(`📤 Iniciando exportação em formato ${format}`, 'info');
    
    try {
        const filters = (typeof FilterManager !== 'undefined') ? FilterManager.getActiveFilters() : {};
        const exportUrl = `${CONFIG.ENDPOINTS.EXPORT}?format=${format}&sortBy=${AppState.currentSort.column}&sortOrder=${AppState.currentSort.order}&filters=${encodeURIComponent(JSON.stringify(filters))}`;
        
        window.open(exportUrl, '_blank');
        Debug.log(`✅ Exportação iniciada: ${format}`, 'success');
        
    } catch (error) {
        Debug.error(`❌ Erro na exportação: ${error.message}`);
        if (typeof UI !== 'undefined' && typeof UI.showError === 'function') {
            UI.showError('exportError', `Erro na exportação: ${error.message}`);
        }
    }
}

// Refresh dos resultados
function refreshResults() {
    // Verificar autenticação
    Auth.requireAuth(() => {
        Debug.log('🔄 Atualizando resultados...', 'info');
        if (typeof pesquisarLicitacoes !== 'undefined') {
            pesquisarLicitacoes(AppState.currentPage);
        }
    });
}

// Busca rápida na tabela
function quickTableSearch(searchTerm) {
    const tbody = document.getElementById('resultsTableBody');
    if (!tbody) return;
    
    const rows = tbody.querySelectorAll('tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        const match = text.includes(searchTerm.toLowerCase());
        row.style.display = match ? '' : 'none';
    });
}

// Limpar filtros
function clearFilters() {
    Auth.requireAuth(() => {
        if (typeof FilterManager !== 'undefined' && typeof FilterManager.clearAllFilters === 'function') {
            FilterManager.clearAllFilters();
            Debug.log('🧹 Filtros limpos', 'info');
        }
    });
}

// Funções de paginação
function firstPage() {
    Auth.requireAuth(() => {
        if (typeof pesquisarLicitacoes !== 'undefined') {
            pesquisarLicitacoes(1);
        }
    });
}

function previousPage() {
    Auth.requireAuth(() => {
        if (AppState.currentPage > 1 && typeof pesquisarLicitacoes !== 'undefined') {
            pesquisarLicitacoes(AppState.currentPage - 1);
        }
    });
}

function nextPage() {
    Auth.requireAuth(() => {
        const maxPage = Math.ceil(AppState.totalItems / AppState.pageSize);
        if (AppState.currentPage < maxPage && typeof pesquisarLicitacoes !== 'undefined') {
            pesquisarLicitacoes(AppState.currentPage + 1);
        }
    });
}

function lastPage() {
    Auth.requireAuth(() => {
        const maxPage = Math.ceil(AppState.totalItems / AppState.pageSize);
        if (typeof pesquisarLicitacoes !== 'undefined') {
            pesquisarLicitacoes(maxPage);
        }
    });
}

// =====================================
// 🎬 INICIALIZAÇÃO AUTOMÁTICA
// =====================================

// Verificar se todos os scripts necessários foram carregados
function checkDependencies() {
    const requiredModules = ['CONFIG', 'Debug'];
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
        // Aguardar um pouco para garantir que todos os scripts carregaram
        await new Promise(resolve => setTimeout(resolve, 100));
        
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
window.refreshResults = refreshResults;
window.quickTableSearch = quickTableSearch;
window.clearFilters = clearFilters;
window.firstPage = firstPage;
window.previousPage = previousPage;
window.nextPage = nextPage;
window.lastPage = lastPage;

console.log('✅ MAIN: Arquivo principal carregado - Sistema pronto para inicialização');
