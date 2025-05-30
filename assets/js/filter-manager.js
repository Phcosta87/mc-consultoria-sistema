<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>06-filter-manager.js - Filtros Múltiplos Avançados</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Fira+Code:wght@300;400;500&display=swap" rel="stylesheet">
    <style>
        * { font-family: 'Inter', sans-serif; }
        .code-block { 
            font-family: 'Fira Code', monospace; 
            background: #1e1e1e; 
            color: #d4d4d4; 
            border-radius: 12px; 
            padding: 20px; 
            margin: 20px 0; 
            overflow-x: auto; 
            border: 1px solid #333;
        }
        .gradient-bg { 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
        }
        .glass-card { 
            background: rgba(255, 255, 255, 0.95); 
            backdrop-filter: blur(20px); 
            border: 1px solid rgba(255, 255, 255, 0.2); 
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.1); 
        }
        .section-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        .feature-badge {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
        }
        .highlight { background: #fff3cd; padding: 2px 6px; border-radius: 4px; }
        .critical { background: #f8d7da; padding: 2px 6px; border-radius: 4px; color: #721c24; }
        .new-feature { background: #d1ecf1; padding: 2px 6px; border-radius: 4px; color: #0c5460; }
    </style>
</head>
<body class="gradient-bg min-h-screen">
    <div class="container mx-auto px-4 py-8">
        <!-- Header -->
        <div class="glass-card rounded-2xl p-8 mb-8 text-center">
            <h1 class="text-4xl font-bold section-header mb-4">06-filter-manager.js</h1>
            <p class="text-lg text-gray-600 mb-4">Gerenciador de Filtros Múltiplos Avançados</p>
            <div class="flex justify-center space-x-3 flex-wrap">
                <span class="feature-badge">Filtros Múltiplos</span>
                <span class="feature-badge">Novos Campos</span>
                <span class="feature-badge">Sincronização</span>
                <span class="feature-badge">Debug Avançado</span>
            </div>
        </div>

        <!-- Principais Funcionalidades -->
        <div class="glass-card rounded-2xl p-6 mb-8">
            <h2 class="text-2xl font-bold section-header mb-6">🎯 Principais Funcionalidades</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div class="bg-blue-50 p-4 rounded-lg">
                    <h3 class="font-semibold text-blue-800 mb-2">🔍 Filtros Existentes</h3>
                    <ul class="text-sm text-blue-600 space-y-1">
                        <li>• Modalidades (múltiplas)</li>
                        <li>• Tipologias (múltiplas)</li>
                        <li>• Data Início/Fim</li>
                        <li>• Valor Min/Max</li>
                        <li>• Estado</li>
                    </ul>
                </div>
                <div class="bg-green-50 p-4 rounded-lg">
                    <h3 class="font-semibold text-green-800 mb-2">🆕 Novos Filtros</h3>
                    <ul class="text-sm text-green-600 space-y-1">
                        <li>• <span class="new-feature">Município</span></li>
                        <li>• <span class="new-feature">Modo Disputa</span></li>
                        <li>• <span class="new-feature">Ano Compra</span></li>
                        <li>• <span class="new-feature">Controle PNCP</span></li>
                        <li>• <span class="new-feature">Nº Compra Órgão</span></li>
                    </ul>
                </div>
                <div class="bg-purple-50 p-4 rounded-lg">
                    <h3 class="font-semibold text-purple-800 mb-2">⚙️ Recursos Avançados</h3>
                    <ul class="text-sm text-purple-600 space-y-1">
                        <li>• Sincronização automática</li>
                        <li>• Validação em tempo real</li>
                        <li>• Presets inteligentes</li>
                        <li>• Debug específico</li>
                        <li>• Performance tracking</li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Código Principal -->
        <div class="glass-card rounded-2xl p-6 mb-8">
            <h2 class="text-2xl font-bold section-header mb-6">📝 Código do Filter Manager</h2>
            
            <div class="code-block">
<pre>// =====================================
// 🔍 GERENCIADOR DE FILTROS MÚLTIPLOS AVANÇADOS - MC CONSULTORIA
// =====================================

const FilterManager = {
    // Estado dos filtros expandido
    state: {
        // Filtros múltiplos (arrays)
        modalidades: [],
        tipologias: [],
        
        // <span class="new-feature">NOVOS FILTROS ADICIONADOS</span>
        municipio: '',
        modo_disputa: '',
        ano_compra: '',
        controle_pncp: '',
        numero_compra_orgao: '',
        
        // Filtros existentes
        dataInicio: '',
        dataFim: '',
        valorMinimo: '',
        valorMaximo: '',
        estado: '',
        
        // Controle interno
        isInitialized: false,
        lastSync: null
    },

    // <span class="critical">FUNÇÃO DE INICIALIZAÇÃO CRÍTICA</span>
    init() {
        Debug.log('🚀 Inicializando FilterManager avançado...', 'info');
        
        if (this.state.isInitialized) {
            Debug.log('⚠️ FilterManager já inicializado!', 'warning');
            return;
        }

        this.setupEventListeners();
        this.setupNewFieldsListeners(); // <span class="new-feature">NOVO</span>
        this.setupPresets();
        this.syncState();
        
        this.state.isInitialized = true;
        Debug.log('✅ FilterManager inicializado com sucesso!', 'success');
    },

    // Event listeners para filtros múltiplos existentes
    setupEventListeners() {
        Debug.log('🔧 Configurando listeners para filtros múltiplos...', 'info');
        
        // Modalidades - múltiplas seleções
        document.querySelectorAll('input[name="modalidade"]').forEach((checkbox, index) => {
            Debug.log(`➕ Listener modalidade ${index + 1}: ${checkbox.value}`, 'info');
            checkbox.addEventListener('change', (e) => this.handleModalidadeChange(e));
        });
        
        // Tipologias - múltiplas seleções
        document.querySelectorAll('input[name="tipologia"]').forEach((checkbox, index) => {
            Debug.log(`➕ Listener tipologia ${index + 1}: ${checkbox.value}`, 'info');
            checkbox.addEventListener('change', (e) => this.handleTipologiaChange(e));
        });
        
        // Campos de data
        ['dataInicio', 'dataFim'].forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                field.addEventListener('change', (e) => this.handleFieldChange(fieldId, e.target.value));
            }
        });
        
        // Campos de valor
        ['valorMinimo', 'valorMaximo'].forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                field.addEventListener('input', (e) => this.handleFieldChange(fieldId, e.target.value));
            }
        });
        
        // Estado
        const estadoField = document.getElementById('estado');
        if (estadoField) {
            estadoField.addEventListener('change', (e) => this.handleFieldChange('estado', e.target.value));
        }
    },

    // <span class="new-feature">NOVO: Event listeners para novos campos</span>
    setupNewFieldsListeners() {
        Debug.log('🆕 Configurando listeners para NOVOS campos...', 'info');
        
        const newFields = [
            'municipio',
            'modo_disputa', 
            'ano_compra',
            'controle_pncp',
            'numero_compra_orgao'
        ];
        
        newFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                const eventType = field.type === 'select-one' ? 'change' : 'input';
                field.addEventListener(eventType, (e) => {
                    this.handleNewFieldChange(fieldId, e.target.value);
                });
                Debug.log(`✅ Listener configurado para: ${fieldId}`, 'success');
            } else {
                Debug.log(`⚠️ Campo não encontrado: ${fieldId}`, 'warning');
            }
        });
    },

    // Handler para mudanças de modalidade
    handleModalidadeChange(event) {
        const value = event.target.value;
        const isChecked = event.target.checked;
        
        if (isChecked) {
            if (!this.state.modalidades.includes(value)) {
                this.state.modalidades.push(value);
            }
        } else {
            this.state.modalidades = this.state.modalidades.filter(m => m !== value);
        }
        
        Debug.log(`🎯 Modalidade ${isChecked ? 'ADICIONADA' : 'REMOVIDA'}: ${value}`, 'success');
        Debug.log(`📋 Modalidades ativas: [${this.state.modalidades.join(', ')}] (${this.state.modalidades.length})`, 'info');
        
        this.updateUI();
    },

    // Handler para mudanças de tipologia
    handleTipologiaChange(event) {
        const value = event.target.value;
        const isChecked = event.target.checked;
        
        if (isChecked) {
            if (!this.state.tipologias.includes(value)) {
                this.state.tipologias.push(value);
            }
        } else {
            this.state.tipologias = this.state.tipologias.filter(t => t !== value);
        }
        
        Debug.log(`🎯 Tipologia ${isChecked ? 'ADICIONADA' : 'REMOVIDA'}: ${value}`, 'success');
        Debug.log(`📋 Tipologias ativas: [${this.state.tipologias.join(', ')}] (${this.state.tipologias.length})`, 'info');
        
        this.updateUI();
    },

    // Handler para campos simples
    handleFieldChange(fieldName, value) {
        const oldValue = this.state[fieldName];
        this.state[fieldName] = value;
        
        Debug.log(`🔄 Campo alterado: ${fieldName}`, 'info', {
            de: oldValue,
            para: value
        });
        
        this.updateUI();
    },

    // <span class="new-feature">NOVO: Handler para novos campos</span>
    handleNewFieldChange(fieldName, value) {
        const oldValue = this.state[fieldName];
        this.state[fieldName] = value;
        
        Debug.log(`🆕 NOVO CAMPO alterado: ${fieldName}`, 'success', {
            de: oldValue,
            para: value,
            tipo: 'novo_filtro'
        });
        
        this.updateUI();
        this.validateNewField(fieldName, value);
    },

    // <span class="new-feature">NOVO: Validação específica para novos campos</span>
    validateNewField(fieldName, value) {
        switch(fieldName) {
            case 'ano_compra':
                if (value && (isNaN(value) || value < 2020 || value > new Date().getFullYear())) {
                    Debug.log(`⚠️ Ano inválido: ${value}`, 'warning');
                    return false;
                }
                break;
                
            case 'controle_pncp':
                if (value && value.length < 3) {
                    Debug.log(`⚠️ Controle PNCP muito curto: ${value}`, 'warning');
                    return false;
                }
                break;
                
            case 'numero_compra_orgao':
                if (value && value.length < 2) {
                    Debug.log(`⚠️ Número de compra muito curto: ${value}`, 'warning');
                    return false;
                }
                break;
        }
        return true;
    },

    // Sincronizar estado com DOM
    syncState() {
        Debug.log('🔄 Sincronizando estado com DOM...', 'info');
        
        // Sincronizar modalidades
        this.state.modalidades = Array.from(
            document.querySelectorAll('input[name="modalidade"]:checked')
        ).map(cb => cb.value);
        
        // Sincronizar tipologias
        this.state.tipologias = Array.from(
            document.querySelectorAll('input[name="tipologia"]:checked')
        ).map(cb => cb.value);
        
        // Sincronizar campos simples
        const simpleFields = ['dataInicio', 'dataFim', 'valorMinimo', 'valorMaximo', 'estado'];
        simpleFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                this.state[fieldId] = field.value;
            }
        });
        
        // <span class="new-feature">Sincronizar novos campos</span>
        const newFields = ['municipio', 'modo_disputa', 'ano_compra', 'controle_pncp', 'numero_compra_orgao'];
        newFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                this.state[fieldId] = field.value;
            }
        });
        
        this.state.lastSync = new Date();
        
        Debug.log('✅ Estado sincronizado', 'success', {
            modalidades: this.state.modalidades.length,
            tipologias: this.state.tipologias.length,
            novos_campos: {
                municipio: this.state.municipio,
                modo_disputa: this.state.modo_disputa,
                ano_compra: this.state.ano_compra,
                controle_pncp: this.state.controle_pncp,
                numero_compra_orgao: this.state.numero_compra_orgao
            }
        });
        
        this.updateUI();
    },

    // Atualizar interface
    updateUI() {
        this.updateFilterCounters();
        this.updateActiveFiltersDisplay();
        this.updateSearchButton();
    },

    // Atualizar contadores de filtros
    updateFilterCounters() {
        const modalidades = this.state.modalidades.length;
        const tipologias = this.state.tipologias.length;
        
        // <span class="new-feature">Contar novos filtros ativos</span>
        const newFiltersActive = ['municipio', 'modo_disputa', 'ano_compra', 'controle_pncp', 'numero_compra_orgao']
            .filter(field => this.state[field] && this.state[field].trim() !== '').length;
        
        const oldFiltersActive = ['dataInicio', 'dataFim', 'valorMinimo', 'valorMaximo', 'estado']
            .filter(field => this.state[field] && this.state[field].trim() !== '').length;
        
        const total = modalidades + tipologias + newFiltersActive + oldFiltersActive;

        // Atualizar contadores visuais
        const modalidadeCounter = document.getElementById('modalidadeCounter');
        const tipologiaCounter = document.getElementById('tipologiaCounter');
        const activeFiltersEl = document.getElementById('activeFilters');

        if (modalidadeCounter) {
            modalidadeCounter.textContent = modalidades;
            modalidadeCounter.classList.toggle('hidden', modalidades === 0);
        }

        if (tipologiaCounter) {
            tipologiaCounter.textContent = tipologias;
            tipologiaCounter.classList.toggle('hidden', tipologias === 0);
        }

        if (activeFiltersEl) {
            activeFiltersEl.textContent = total;
        }

        Debug.log(`📊 Contadores atualizados:`, 'info', {
            modalidades,
            tipologias,
            novos_filtros: newFiltersActive,
            filtros_antigos: oldFiltersActive,
            total
        });
    },

    // Atualizar display de filtros ativos
    updateActiveFiltersDisplay() {
        const filtersBadge = document.getElementById('filtersBadge');
        const total = this.getTotalActiveFilters();
        
        if (filtersBadge) {
            if (total > 0) {
                filtersBadge.textContent = `${total} ativos`;
                filtersBadge.classList.remove('hidden');
            } else {
                filtersBadge.classList.add('hidden');
            }
        }
    },

    // Atualizar botão de pesquisa
    updateSearchButton() {
        const searchText = document.getElementById('searchText');
        const total = this.getTotalActiveFilters();
        
        if (searchText) {
            if (total > 0) {
                searchText.textContent = `Pesquisar (${total} filtros)`;
            } else {
                searchText.textContent = 'Pesquisar Licitações';
            }
        }
    },

    // Obter total de filtros ativos
    getTotalActiveFilters() {
        const modalidades = this.state.modalidades.length;
        const tipologias = this.state.tipologias.length;
        
        const simpleFilters = ['dataInicio', 'dataFim', 'valorMinimo', 'valorMaximo', 'estado']
            .filter(field => this.state[field] && this.state[field].trim() !== '').length;
            
        const newFilters = ['municipio', 'modo_disputa', 'ano_compra', 'controle_pncp', 'numero_compra_orgao']
            .filter(field => this.state[field] && this.state[field].trim() !== '').length;
        
        return modalidades + tipologias + simpleFilters + newFilters;
    },

    // <span class="critical">FUNÇÃO PRINCIPAL: Obter filtros formatados para API</span>
    getFilters() {
        Debug.log('🎯 Coletando filtros para envio à API...', 'info');
        
        // Garantir sincronização
        this.syncState();
        
        const filters = {
            // Arrays sempre incluídos (podem estar vazios)
            modalidades: this.state.modalidades,
            tipologias: this.state.tipologias,
            
            // <span class="new-feature">NOVOS CAMPOS ADICIONADOS</span>
            municipio: this.state.municipio,
            modo_disputa: this.state.modo_disputa,
            ano_compra: this.state.ano_compra,
            controle_pncp: this.state.controle_pncp,
            numero_compra_orgao: this.state.numero_compra_orgao
        };
        
        // Adicionar campos condicionalmente
        if (this.state.dataInicio) filters.dataInicio = this.state.dataInicio;
        if (this.state.dataFim) filters.dataFim = this.state.dataFim;
        if (this.state.valorMinimo) filters.valorMinimo = this.parseNumber(this.state.valorMinimo);
        if (this.state.valorMaximo) filters.valorMaximo = this.parseNumber(this.state.valorMaximo);
        if (this.state.estado) filters.estado = this.state.estado;
        
        Debug.log('🎯 FILTROS COLETADOS PARA API:', 'success', {
            estrutura_completa: filters,
            resumo: {
                modalidades: filters.modalidades.length,
                tipologias: filters.tipologias.length,
                novos_filtros_ativos: Object.keys(filters).filter(k => 
                    ['municipio', 'modo_disputa', 'ano_compra', 'controle_pncp', 'numero_compra_orgao'].includes(k) 
                    && filters[k]
                ).length
            }
        });
        
        return filters;
    },

    // Utilitário para parsing de números
    parseNumber(value) {
        if (!value) return 0;
        const cleaned = value.replace(/[R$\s]/g, '').replace(/\./g, '').replace(',', '.');
        return parseFloat(cleaned) || 0;
    },

    // Limpar todos os filtros
    clearAll() {
        Debug.log('🧹 Limpando todos os filtros...', 'info');
        
        // Limpar checkboxes
        document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
        
        // Limpar campos de texto
        ['dataInicio', 'dataFim', 'valorMinimo', 'valorMaximo', 'estado', 
         'municipio', 'modo_disputa', 'ano_compra', 'controle_pncp', 'numero_compra_orgao']
        .forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) field.value = '';
        });
        
        // Resetar estado
        Object.keys(this.state).forEach(key => {
            if (Array.isArray(this.state[key])) {
                this.state[key] = [];
            } else if (typeof this.state[key] === 'string') {
                this.state[key] = '';
            }
        });
        
        this.updateUI();
        Debug.log('✅ Todos os filtros limpos', 'success');
    },

    // <span class="new-feature">NOVO: Presets inteligentes expandidos</span>
    setupPresets() {
        // Preset para obras
        window.loadPreset = (preset) => {
            this.clearAll();
            
            if (preset === 'obras') {
                // Selecionar tipologias relacionadas a obras
                const obraValues = ['Obra/Construção', 'Reforma Estrutural', 'Pavimentação'];
                obraValues.forEach(value => {
                    const checkbox = document.querySelector(`input[name="tipologia"][value="${value}"]`);
                    if (checkbox) {
                        checkbox.checked = true;
                        checkbox.dispatchEvent(new Event('change'));
                    }
                });
                
                // Definir valor mínimo
                const valorMinField = document.getElementById('valorMinimo');
                if (valorMinField) {
                    valorMinField.value = 'R$ 100.000,00';
                    this.handleFieldChange('valorMinimo', valorMinField.value);
                }
                
                Debug.log('🏗️ Preset "obras" aplicado', 'success');
                
            } else if (preset === 'servicos') {
                // Selecionar tipologias de serviços
                const servicoValues = ['Projetos/Serviços de Engenharia', 'Outros Serviços', 'Manutenção'];
                servicoValues.forEach(value => {
                    const checkbox = document.querySelector(`input[name="tipologia"][value="${value}"]`);
                    if (checkbox) {
                        checkbox.checked = true;
                        checkbox.dispatchEvent(new Event('change'));
                    }
                });
                
                // Definir valor máximo
                const valorMaxField = document.getElementById('valorMaximo');
                if (valorMaxField) {
                    valorMaxField.value = 'R$ 500.000,00';
                    this.handleFieldChange('valorMaximo', valorMaxField.value);
                }
                
                Debug.log('🔧 Preset "servicos" aplicado', 'success');
            }
        };
    },

    // <span class="new-feature">FUNÇÃO DE TESTE ESPECÍFICA PARA FILTROS</span>
    testFilters() {
        Debug.log('🧪 === TESTE ESPECÍFICO DOS FILTROS ===', 'success');
        
        const state = { ...this.state };
        const filters = this.getFilters();
        const total = this.getTotalActiveFilters();
        
        Debug.log('📊 Estado interno:', 'info', state);
        Debug.log('📤 Filtros para API:', 'info', filters);
        Debug.log(`🔢 Total de filtros ativos: ${total}`, 'info');
        
        // Verificar inconsistências
        const modalidadesDOM = document.querySelectorAll('input[name="modalidade"]:checked').length;
        const tipologiasDOM = document.querySelectorAll('input[name="tipologia"]:checked').length;
        
        if (modalidadesDOM !== state.modalidades.length) {
            Debug.log('⚠️ INCONSISTÊNCIA: modalidades DOM vs Estado', 'warning');
        }
        
        if (tipologiasDOM !== state.tipologias.length) {
            Debug.log('⚠️ INCONSISTÊNCIA: tipologias DOM vs Estado', 'warning');
        }
        
        return {
            state: state,
            filters: filters,
            total: total,
            consistency: {
                modalidades: modalidadesDOM === state.modalidades.length,
                tipologias: tipologiasDOM === state.tipologias.length
            }
        };
    }
};

// <span class="critical">Expor funções globalmente</span>
window.FilterManager = FilterManager;
window.clearFilters = () => FilterManager.clearAll();
window.testFilters = () => FilterManager.testFilters();

// <span class="highlight">Auto-inicialização quando DOM estiver pronto</span>
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => FilterManager.init());
} else {
    FilterManager.init();
}</pre>
            </div>
        </div>

        <!-- Novos Campos Detalhados -->
        <div class="glass-card rounded-2xl p-6 mb-8">
            <h2 class="text-2xl font-bold section-header mb-6">🆕 Novos Campos Implementados</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-4">
                    <div class="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                        <h3 class="font-semibold text-green-800 mb-2">📍 Município</h3>
                        <p class="text-sm text-green-600">Campo de texto para filtrar por município específico. Utiliza busca parcial (ILIKE %value%).</p>
                        <code class="text-xs bg-green-100 px-2 py-1 rounded">municipio ILIKE '%{value}%'</code>
                    </div>
                    
                    <div class="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                        <h3 class="font-semibold text-blue-800 mb-2">⚔️ Modo Disputa</h3>
                        <p class="text-sm text-blue-600">Select ou input para tipo de disputa da licitação. Busca exata ou parcial.</p>
                        <code class="text-xs bg-blue-100 px-2 py-1 rounded">modo_disputa = '{value}'</code>
                    </div>
                    
                    <div class="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                        <h3 class="font-semibold text-purple-800 mb-2">📅 Ano Compra</h3>
                        <p class="text-sm text-purple-600">Campo numérico para ano específico. Validação automática de range.</p>
                        <code class="text-xs bg-purple-100 px-2 py-1 rounded">ano_compra = {value}</code>
                    </div>
                </div>
                
                <div class="space-y-4">
                    <div class="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                        <h3 class="font-semibold text-orange-800 mb-2">🏛️ Controle PNCP</h3>
                        <p class="text-sm text-orange-600">Código de controle do Portal Nacional de Contratações Públicas.</p>
                        <code class="text-xs bg-orange-100 px-2 py-1 rounded">controle_pncp ILIKE '%{value}%'</code>
                    </div>
                    
                    <div class="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                        <h3 class="font-semibold text-red-800 mb-2">🔢 Nº Compra Órgão</h3>
                        <p class="text-sm text-red-600">Número interno da compra no órgão. Busca parcial para flexibilidade.</p>
                        <code class="text-xs bg-red-100 px-2 py-1 rounded">numero_compra_orgao ILIKE '%{value}%'</code>
                    </div>
                </div>
            </div>
        </div>

        <!-- Validações e Segurança -->
        <div class="glass-card rounded-2xl p-6 mb-8">
            <h2 class="text-2xl font-bold section-header mb-6">🛡️ Validações e Segurança</h2>
            
            <div class="space-y-4">
                <div class="bg-yellow-50 p-4 rounded-lg">
                    <h3 class="font-semibold text-yellow-800 mb-2">⚠️ Validações Implementadas</h3>
                    <ul class="text-sm text-yellow-700 space-y-2">
                        <li><strong>Ano Compra:</strong> Validação de range (2020 - ano atual)</li>
                        <li><strong>Controle PNCP:</strong> Mínimo 3 caracteres</li>
                        <li><strong>Nº Compra Órgão:</strong> Mínimo 2 caracteres</li>
                        <li><strong>Valores Monetários:</strong> Parsing seguro com formatação brasileira</li>
                        <li><strong>Datas:</strong> Validação de formato ISO</li>
                    </ul>
                </div>
                
                <div class="bg-blue-50 p-4 rounded-lg">
                    <h3 class="font-semibold text-blue-800 mb-2">🔄 Sincronização Automática</h3>
                    <ul class="text-sm text-blue-700 space-y-2">
                        <li>Estado sincronizado automaticamente com DOM</li>
                        <li>Validação em tempo real durante digitação</li>
                        <li>Prevenção de inconsistências entre interface e dados</li>
                        <li>Log detalhado de todas as operações</li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Funções de Teste -->
        <div class="glass-card rounded-2xl p-6">
            <h2 class="text-2xl font-bold section-header mb-6">🧪 Funções de Teste</h2>
            
            <div class="bg-gray-50 p-4 rounded-lg">
                <h3 class="font-semibold text-gray-800 mb-3">Comandos Disponíveis no Console:</h3>
                <div class="space-y-2 text-sm font-mono">
                    <div><code class="bg-gray-200 px-2 py-1 rounded">FilterManager.testFilters()</code> - Teste completo dos filtros</div>
                    <div><code class="bg-gray-200 px-2 py-1 rounded">FilterManager.getFilters()</code> - Obter filtros formatados</div>
                    <div><code class="bg-gray-200 px-2 py-1 rounded">FilterManager.syncState()</code> - Forçar sincronização</div>
                    <div><code class="bg-gray-200 px-2 py-1 rounded">clearFilters()</code> - Limpar todos os filtros</div>
                    <div><code class="bg-gray-200 px-2 py-1 rounded">loadPreset('obras')</code> - Carregar preset de obras</div>
                    <div><code class="bg-gray-200 px-2 py-1 rounded">loadPreset('servicos')</code> - Carregar preset de serviços</div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
