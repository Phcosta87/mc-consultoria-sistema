// =====================================
// 🔍 GERENCIADOR DE FILTROS MÚLTIPLOS
// MC Consultoria - Sistema de Licitações
// =====================================

const FilterManager = {
    initialized: false,
    
    // Configurar event listeners para filtros múltiplos
    setupEventListeners() {
        Debug.log('🔧 Configurando event listeners para filtros múltiplos...', 'info');
        
        // Event listeners para modalidades
        const modalidadeCheckboxes = document.querySelectorAll('input[name="modalidade"]');
        modalidadeCheckboxes.forEach((checkbox, index) => {
            Debug.log(`➕ Configurando listener para modalidade ${index + 1}: ${checkbox.value}`, 'info');
            checkbox.addEventListener('change', (e) => this.handleModalidadeChange(e));
        });
        
        // Event listeners para tipologias
        const tipologiaCheckboxes = document.querySelectorAll('input[name="tipologia"]');
        tipologiaCheckboxes.forEach((checkbox, index) => {
            Debug.log(`➕ Configurando listener para tipologia ${index + 1}: ${checkbox.value}`, 'info');
            checkbox.addEventListener('change', (e) => this.handleTipologiaChange(e));
        });
        
        // Event listeners para outros filtros
        this.setupOtherFilters();
        
        this.initialized = true;
        Debug.log('✅ Event listeners configurados com sucesso!', 'success');
    },
    
    // Configurar outros filtros (datas, valores, etc.)
    setupOtherFilters() {
        const filterElements = [
            'dataInicio', 'dataFim', 'valorMinimo', 'valorMaximo', 
            'estado', 'municipio', 'modo_disputa', 'ano_compra', 
            'controle_pncp', 'numero_compra_orgao'
        ];
        
        filterElements.forEach(elementId => {
            const element = document.getElementById(elementId);
            if (element) {
                element.addEventListener('change', () => this.updateUI());
                element.addEventListener('input', () => this.updateUI());
            }
        });
    },
    
    // Tratar mudanças em modalidades
    handleModalidadeChange(event) {
        const value = event.target.value;
        const isChecked = event.target.checked;
        
        if (!AppState.activeFilters) {
            AppState.activeFilters = { modalidades: [], tipologias: [] };
        }
        
        if (isChecked) {
            if (!AppState.activeFilters.modalidades.includes(value)) {
                AppState.activeFilters.modalidades.push(value);
            }
        } else {
            AppState.activeFilters.modalidades = AppState.activeFilters.modalidades.filter(m => m !== value);
        }
        
        Debug.log(`🎯 Modalidade ${isChecked ? 'ADICIONADA' : 'REMOVIDA'}: ${value}`, 'success');
        Debug.log(`📋 Modalidades ativas: [${AppState.activeFilters.modalidades.join(', ')}] (Total: ${AppState.activeFilters.modalidades.length})`, 'info');
        
        this.updateUI();
    },
    
    // Tratar mudanças em tipologias
    handleTipologiaChange(event) {
        const value = event.target.value;
        const isChecked = event.target.checked;
        
        if (!AppState.activeFilters) {
            AppState.activeFilters = { modalidades: [], tipologias: [] };
        }
        
        if (isChecked) {
            if (!AppState.activeFilters.tipologias.includes(value)) {
                AppState.activeFilters.tipologias.push(value);
            }
        } else {
            AppState.activeFilters.tipologias = AppState.activeFilters.tipologias.filter(t => t !== value);
        }
        
        Debug.log(`🎯 Tipologia ${isChecked ? 'ADICIONADA' : 'REMOVIDA'}: ${value}`, 'success');
        Debug.log(`📋 Tipologias ativas: [${AppState.activeFilters.tipologias.join(', ')}] (Total: ${AppState.activeFilters.tipologias.length})`, 'info');
        
        this.updateUI();
    },
    
    // Atualizar interface
    updateUI() {
        if (typeof UI !== 'undefined') {
            UI.updateFilterCounters();
        }
        
        Debug.log(`📊 RESUMO COMPLETO DOS FILTROS:`, 'info', {
            modalidades: {
                total: AppState.activeFilters?.modalidades?.length || 0,
                valores: AppState.activeFilters?.modalidades || []
            },
            tipologias: {
                total: AppState.activeFilters?.tipologias?.length || 0,
                valores: AppState.activeFilters?.tipologias || []
            },
            totalGeral: (AppState.activeFilters?.modalidades?.length || 0) + (AppState.activeFilters?.tipologias?.length || 0)
        });
    },
    
    // Sincronizar estado com checkboxes
    syncState() {
        Debug.log('🔄 Sincronizando estado dos filtros...', 'info');
        
        if (!AppState.activeFilters) {
            AppState.activeFilters = { modalidades: [], tipologias: [] };
        }
        
        // Sincronizar modalidades
        AppState.activeFilters.modalidades = Array.from(
            document.querySelectorAll('input[name="modalidade"]:checked')
        ).map(cb => cb.value);
        
        // Sincronizar tipologias
        AppState.activeFilters.tipologias = Array.from(
            document.querySelectorAll('input[name="tipologia"]:checked')
        ).map(cb => cb.value);
        
        Debug.log('✅ Estado sincronizado', 'success', AppState.activeFilters);
        this.updateUI();
    },
    
    // Obter todos os filtros ativos
    getActiveFilters() {
        Debug.log('🔍 Iniciando coleta de filtros múltiplos...', 'info');
        
        // Sincronizar estado primeiro
        this.syncState();
        
        // Validação dupla: checkbox vs estado
        const modalidadeCheckboxes = document.querySelectorAll('input[name="modalidade"]:checked');
        const tipologiaCheckboxes = document.querySelectorAll('input[name="tipologia"]:checked');
        
        const modalidadesFromCheckboxes = Array.from(modalidadeCheckboxes).map(cb => cb.value);
        const tipologiasFromCheckboxes = Array.from(tipologiaCheckboxes).map(cb => cb.value);
        
        // Usar o estado atualizado
        const modalidades = AppState.activeFilters.modalidades || [];
        const tipologias = AppState.activeFilters.tipologias || [];
        
        // Validação crítica
        if (modalidades.length !== modalidadesFromCheckboxes.length || 
            tipologias.length !== tipologiasFromCheckboxes.length) {
            Debug.log('⚠️ INCONSISTÊNCIA DETECTADA entre estado e checkboxes!', 'warning', {
                estado: { modalidades, tipologias },
                checkboxes: { modalidades: modalidadesFromCheckboxes, tipologias: tipologiasFromCheckboxes }
            });
        }
        
        // Outros filtros
        const dataInicio = document.getElementById('dataInicio')?.value || '';
        const dataFim = document.getElementById('dataFim')?.value || '';
        const valorMinimo = this.parseMoneyValue(document.getElementById('valorMinimo')?.value);
        const valorMaximo = this.parseMoneyValue(document.getElementById('valorMaximo')?.value);
        const estado = document.getElementById('estado')?.value || '';
        const municipio = document.getElementById('municipio')?.value || '';
        const modo_disputa = document.getElementById('modo_disputa')?.value || '';
        const ano_compra = document.getElementById('ano_compra')?.value || '';
        const controle_pncp = document.getElementById('controle_pncp')?.value || '';
        const numero_compra_orgao = document.getElementById('numero_compra_orgao')?.value || '';
        
        // Montagem do objeto de filtros
        const filters = {
            // Arrays sempre incluídos, mesmo vazios
            modalidades: modalidades,
            tipologias: tipologias
        };
        
        // Outros filtros condicionais
        if (dataInicio) filters.dataInicio = dataInicio;
        if (dataFim) filters.dataFim = dataFim;
        if (valorMinimo && !isNaN(valorMinimo)) filters.valorMinimo = valorMinimo;
        if (valorMaximo && !isNaN(valorMaximo)) filters.valorMaximo = valorMaximo;
        if (estado) filters.estado = estado;
        if (municipio) filters.municipio = municipio;
        if (modo_disputa) filters.modo_disputa = modo_disputa;
        if (ano_compra) filters.ano_compra = parseInt(ano_compra);
        if (controle_pncp) filters.controle_pncp = controle_pncp;
        if (numero_compra_orgao) filters.numero_compra_orgao = numero_compra_orgao;
        
        // Log detalhado super completo
        Debug.log('🎯 FILTROS COLETADOS DETALHADAMENTE:', 'success', {
            modalidades: {
                total: modalidades.length,
                valores: modalidades,
                checkboxesCount: modalidadeCheckboxes.length
            },
            tipologias: {
                total: tipologias.length,
                valores: tipologias,
                checkboxesCount: tipologiaCheckboxes.length
            },
            outrosFiltros: {
                dataInicio, dataFim, valorMinimo, valorMaximo, estado,
                municipio, modo_disputa, ano_compra, controle_pncp, numero_compra_orgao
            },
            objetoFinal: filters
        });
        
        // Verificação específica para múltiplos filtros
        if (modalidades.length > 1) {
            Debug.log(`🔥 MÚLTIPLAS MODALIDADES DETECTADAS: ${modalidades.length}`, 'success', modalidades);
        }
        if (tipologias.length > 1) {
            Debug.log(`🔥 MÚLTIPLAS TIPOLOGIAS DETECTADAS: ${tipologias.length}`, 'success', tipologias);
        }
        
        return filters;
    },
    
    // Converter valor de moeda para número
    parseMoneyValue(value) {
        if (!value) return 0;
        
        // Remove símbolos de moeda e espaços, substitui vírgula por ponto
        const cleanValue = value
            .replace(/[R$\s]/g, '')
            .replace(/\./g, '')
            .replace(',', '.');
        
        return parseFloat(cleanValue) || 0;
    },
    
    // Limpar todos os filtros
    clearFilters() {
        Debug.log('🧹 Limpando todos os filtros...', 'info');
        
        // Limpar checkboxes
        document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
            cb.checked = false;
        });
        
        // Limpar campos de texto e select
        const fieldsToClear = [
            'dataInicio', 'dataFim', 'valorMinimo', 'valorMaximo', 'estado',
            'municipio', 'modo_disputa', 'ano_compra', 'controle_pncp', 'numero_compra_orgao'
        ];
        
        fieldsToClear.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) field.value = '';
        });
        
        // Limpar estado
        if (AppState.activeFilters) {
            AppState.activeFilters.modalidades = [];
            AppState.activeFilters.tipologias = [];
        }
        
        this.updateUI();
        Debug.log('🧹 Filtros limpos com sucesso', 'success');
    },
    
    // Carregar preset de filtros
    loadPreset(presetName) {
        Debug.log(`🎨 Carregando preset: ${presetName}`, 'info');
        
        this.clearFilters();
        
        const preset = CONFIG.PRESETS[presetName];
        if (!preset) {
            Debug.warning(`Preset '${presetName}' não encontrado`);
            return;
        }
        
        // Aplicar tipologias do preset
        if (preset.tipologias) {
            preset.tipologias.forEach(tipologia => {
                const checkbox = document.querySelector(`input[name="tipologia"][value="${tipologia}"]`);
                if (checkbox) {
                    checkbox.checked = true;
                    checkbox.dispatchEvent(new Event('change'));
                }
            });
        }
        
        // Aplicar outros filtros
        if (preset.valorMinimo) {
            const valorMinimoField = document.getElementById('valorMinimo');
            if (valorMinimoField) {
                valorMinimoField.value = this.formatMoney(preset.valorMinimo);
            }
        }
        
        if (preset.valorMaximo) {
            const valorMaximoField = document.getElementById('valorMaximo');
            if (valorMaximoField) {
                valorMaximoField.value = this.formatMoney(preset.valorMaximo);
            }
        }
        
        Debug.log(`🎨 Preset '${presetName}' aplicado com sucesso`, 'success', preset);
    },
    
    // Formatar valor como moeda
    formatMoney(value) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    },
    
    // Verificar se há filtros ativos
    hasActiveFilters() {
        const filters = this.getActiveFilters();
        const hasModalidades = filters.modalidades && filters.modalidades.length > 0;
        const hasTipologias = filters.tipologias && filters.tipologias.length > 0;
        const hasOtherFilters = Object.keys(filters).some(key => 
            !['modalidades', 'tipologias'].includes(key) && filters[key]
        );
        
        return hasModalidades || hasTipologias || hasOtherFilters;
    },
    
    // Contar filtros ativos
    countActiveFilters() {
        const filters = this.getActiveFilters();
        let count = 0;
        
        if (filters.modalidades) count += filters.modalidades.length;
        if (filters.tipologias) count += filters.tipologias.length;
        
        // Contar outros filtros
        Object.keys(filters).forEach(key => {
            if (!['modalidades', 'tipologias'].includes(key) && filters[key]) {
                count++;
            }
        });
        
        return count;
    }
};

// Funções globais
window.FilterManager = FilterManager;
window.clearFilters = () => FilterManager.clearFilters();
window.loadPreset = (preset) => FilterManager.loadPreset(preset);

console.log('✅ FILTER MANAGER: Sistema de filtros múltiplos carregado');
