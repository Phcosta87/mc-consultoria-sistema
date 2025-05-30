// =====================================
// 🔧 CONFIGURAÇÕES MC CONSULTORIA
// Sistema de Licitações - Configurações Centralizadas
// =====================================

const CONFIG = {
    // Endpoints N8N
    ENDPOINTS: {
        FRONTEND: 'https://n8n.mcconsultoria.shop/webhook/produto1',
        LOGIN: 'https://n8n.mcconsultoria.shop/webhook/loginproduto1',
        CONSULTA: 'https://n8n.mcconsultoria.shop/webhook/consultaproduto1',
        EXPORT: 'https://n8n.mcconsultoria.shop/webhook/exportproduto1'
    },
    
    // Configurações do Banco de Dados
    DATABASE: {
        TABLE: 'editais_mc',
        TIPOLOGIA_FIELD: 'tipologia_oficial'
    },
    
    // Filtros Disponíveis
    FILTERS: {
        // Filtros básicos originais
        BASIC: ['modalidades', 'tipologias', 'dataInicio', 'dataFim', 'valorMinimo', 'valorMaximo', 'estado'],
        
        // Novos filtros expandidos
        EXTENDED: ['municipio', 'modo_disputa', 'ano_compra', 'controle_pncp', 'numero_compra_orgao']
    },
    
    // Configurações de Paginação
    PAGINATION: {
        ITEMS_PER_PAGE: 25,
        MAX_VISIBLE_PAGES: 5
    },
    
    // Timeouts para Requisições
    TIMEOUTS: {
        LOGIN: 15000,        // 15 segundos
        SEARCH: 30000,       // 30 segundos
        EXPORT: 60000        // 60 segundos
    },
    
    // Configurações de Sistema
    SYSTEM: {
        DEBUG: true,
        PERFORMANCE_TRACKING: true,
        AUTO_REFRESH_INTERVAL: 300000, // 5 minutos
        MAX_RESULTS_PER_PAGE: 100
    },
    
    // Configurações de Interface
    UI: {
        ANIMATION_DURATION: 300,
        LOADING_MIN_TIME: 500,
        SUCCESS_MESSAGE_DURATION: 3000,
        ERROR_MESSAGE_DURATION: 5000
    },
    
    // Modalidades Disponíveis
    MODALIDADES: [
        'Concorrência - Eletrônica',
        'Concorrência - Presencial', 
        'Concurso',
        'Leilão - Eletrônico',
        'Pregão - Eletrônico',
        'Pregão - Presencial'
    ],
    
    // Tipologias Disponíveis
    TIPOLOGIAS: [
        'Obra/Construção',
        'Reforma Estrutural',
        'Manutenção',
        'Pavimentação',
        'Projetos/Serviços de Engenharia',
        'Aquisição',
        'Outros Serviços',
        'Não Classificado'
    ],
    
    // Estados do Brasil
    ESTADOS: [
        { value: 'MG', label: 'Minas Gerais' },
        { value: 'SP', label: 'São Paulo' },
        { value: 'RJ', label: 'Rio de Janeiro' },
        { value: 'ES', label: 'Espírito Santo' },
        { value: 'PR', label: 'Paraná' },
        { value: 'SC', label: 'Santa Catarina' },
        { value: 'RS', label: 'Rio Grande do Sul' }
    ],
    
    // Presets de Filtros
    PRESETS: {
        obras: {
            tipologias: ['Obra/Construção', 'Reforma Estrutural', 'Pavimentação'],
            valorMinimo: 100000
        },
        servicos: {
            tipologias: ['Projetos/Serviços de Engenharia', 'Manutenção', 'Outros Serviços'],
            valorMaximo: 100000
        }
    },
    
    // Configurações de Debug
    DEBUG: {
        MAX_LOGS: 150,
        VISIBLE_LOGS: 30,
        CONSOLE_OUTPUT: true,
        PERFORMANCE_MONITORING: true
    },
    
    // Configurações de Performance
    PERFORMANCE: {
        GOOD_THRESHOLD: 1000,    // ms
        MEDIUM_THRESHOLD: 5000,  // ms
        BAD_THRESHOLD: 10000     // ms
    }
};

// Fazer CONFIG disponível globalmente
window.CONFIG = CONFIG;

// Export para uso em outros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}

console.log('✅ CONFIG: Configurações carregadas', CONFIG);
