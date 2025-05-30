// =====================================
// 🔍 MOTOR DE BUSCA AVANÇADO
// MC Consultoria - Sistema de Licitações
// =====================================

const Search = {
    inProgress: false,
    lastSearchParams: null,
    
    // Executar busca principal
    async execute(page = 1) {
        if (this.inProgress) {
            Debug.warning('Busca já em andamento, ignorando nova requisição');
            return;
        }
        
        this.inProgress = true;
        AppState.currentPage = page;
        
        Performance.start('Busca de Licitações com Filtros Múltiplos');
        Debug.log(`🚀 Iniciando busca com filtros múltiplos - Página: ${page}`, 'info');
        
        // Preparar interface
        this.prepareUI();
        
        try {
            // Obter filtros
            const filters = this.getFilters();
            const requestBody = this.buildRequestBody(filters, page);
            
            Debug.log('📤 ENVIANDO REQUISIÇÃO COM FILTROS MÚLTIPLOS:', 'info', {
                endpoint: CONFIG.ENDPOINTS.CONSULTA,
                method: 'POST',
                filtrosMúltiplos: {
                    modalidades: filters.modalidades,
                    tipologias: filters.tipologias
                },
                requestCompleto: requestBody
            });
            
            // Fazer requisição
            const response = await this.makeRequest(requestBody);
            const data = await this.processResponse(response);
            
            // Processar resultados
            await this.handleResults(data, filters);
            
            const duration = Performance.end('Busca de Licitações com Filtros Múltiplos');
            this.updatePerformanceMetrics(duration, data);
            
        } catch (error) {
            this.handleError(error);
            Performance.end('Busca de Licitações com Filtros Múltiplos');
        } finally {
            this.cleanup();
        }
    },
    
    // Obter filtros (usando FilterManager)
    getFilters() {
        if (typeof FilterManager !== 'undefined') {
            return FilterManager.getActiveFilters();
        }
        
        // Fallback caso FilterManager não esteja disponível
        Debug.warning('FilterManager não disponível, usando coleta básica de filtros');
        return {
            modalidades: [],
            tipologias: []
        };
    },
    
    // Construir corpo da requisição
    buildRequestBody(filters, page) {
        return {
            filters: filters,
            page: AppState.currentPage,
            limit: AppState.pageSize || CONFIG.PAGINATION.ITEMS_PER_PAGE,
            sortBy: AppState.currentSort?.column || 'abertura',
            sortOrder: AppState.currentSort?.order || 'desc'
        };
    },
    
    // Preparar interface para busca
    prepareUI() {
        UI.showLoader('searchBtn');
        UI.showSection('statsSection');
        UI.showSection('chartsSection');
        UI.showSection('resultsSection');
        
        // Mostrar loading na tabela
        if (UI.elements.resultsTableBody) {
            UI.elements.resultsTableBody.innerHTML = `
                <tr>
                    <td colspan="7" class="text-center py-10 text-gray-500">
                        <div class="loading mx-auto"></div> 
                        Carregando dados...
                    </td>
                </tr>
            `;
        }
        
        UI.hideSection('paginationSection');
    },
    
    // Fazer requisição com timeout
    async makeRequest(requestBody) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), CONFIG.TIMEOUTS.SEARCH);
        
        try {
            const response = await fetch(CONFIG.ENDPOINTS.CONSULTA, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody),
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            return response;
            
        } catch (error) {
            clearTimeout(timeoutId);
            if (error.name === 'AbortError') {
                throw new Error(`Timeout: A requisição demorou mais que ${CONFIG.TIMEOUTS.SEARCH/1000}s`);
            }
            throw error;
        }
    },
    
    // Processar resposta da API
    async processResponse(response) {
        const responseText = await response.text();
        Debug.log('📥 Resposta recebida', 'info', { 
            status: response.status, 
            size: responseText.length,
            preview: responseText.substring(0, 200) + '...'
        });
        
        if (!response.ok) {
            throw new Error(`Erro na API: ${response.status} - ${responseText}`);
        }
        
        try {
            return JSON.parse(responseText);
        } catch (e) {
            Debug.error('Erro ao fazer parse da resposta JSON', responseText);
            throw new Error('Resposta inválida do servidor');
        }
    },
    
    // Processar resultados da busca
    async handleResults(data, filters) {
        Debug.log('📊 Dados processados', 'info', {
            hasResults: !!data.results || !!data.data,
            hasStats: !!data.stats || !!data.estatisticas,
            hasDistribution: !!(data.distribution || (data.stats && data.stats.distribution))
        });
        
        // Extrair dados
        const results = this.extractResults(data);
        const stats = this.extractStats(data);
        const total = stats.total || AppState.totalItems;
        
        // Atualizar estado da aplicação
        AppState.totalItems = total;
        AppState.allResults = results;
        AppState.filteredResults = results;
        
        Debug.log(`📈 Total de itens: ${AppState.totalItems}, Página atual: ${AppState.currentPage}`, 'info');
        
        // Renderizar dados
        this.renderResults(results);
        this.renderStats(stats);
        
        // Atualizar gráficos
        const distribution = data.distribution || stats.distribution || {};
        if (typeof Charts !== 'undefined') {
            Charts.update(distribution);
        }
        
        // Renderizar paginação
        this.renderPagination();
        
        Debug.log(`🎉 Busca concluída com sucesso`, 'success', {
            resultados: results.length,
            total: total,
            paginasTotal: Math.ceil(total / AppState.pageSize),
            filtrosAplicados: {
                modalidades: filters.modalidades?.length || 0,
                tipologias: filters.tipologias?.length || 0,
                modalidadesList: filters.modalidades,
                tipologiasList: filters.tipologias
            }
        });
    },
    
    // Extrair resultados da resposta
    extractResults(data) {
        return data.results || 
               data.licitacoes || 
               data.data || 
               data.items ||
               (Array.isArray(data) ? data : []);
    },
    
    // Extrair estatísticas da resposta
    extractStats(data) {
        const stats = data.stats || data.estatisticas || data.summary || {};
        
        return {
            totalLicitacoes: stats.totalLicitacoes || stats.total || data.total || 0,
            valorTotal: stats.valorTotal || stats.valor_total || 0,
            valorMedio: stats.valorMedio || stats.valor_medio || 0,
            totalCompradores: stats.totalCompradores || stats.compradores_unicos || 0,
            totalMunicipios: stats.totalMunicipios || stats.municipios_unicos || 0,
            totalEstados: stats.totalEstados || stats.estados_unicos || 0,
            distribution: stats.distribution || stats.distribuicao || data.distribution || {},
            total: stats.totalLicitacoes || stats.total || data.total || 0
        };
    },
    
    // Renderizar resultados na tabela
    renderResults(results) {
        if (!UI.elements.resultsTableBody) return;
        
        UI.elements.resultsTableBody.innerHTML = '';
        
        if (!results || results.length === 0) {
            UI.elements.resultsTableBody.innerHTML = `
                <tr>
                    <td colspan="7" class="text-center py-10 text-gray-500">
                        📄 Nenhum resultado encontrado.
                    </td>
                </tr>
            `;
            if (UI.elements.resultsCount) {
                UI.elements.resultsCount.textContent = '0 resultados';
            }
            return;
        }
        
        results.forEach(item => {
            const row = this.createTableRow(item);
            UI.elements.resultsTableBody.appendChild(row);
        });
        
        if (UI.elements.resultsCount) {
            UI.elements.resultsCount.textContent = `${AppState.totalItems.toLocaleString('pt-BR')} resultado${AppState.totalItems !== 1 ? 's' : ''}`;
        }
    },
    
    // Criar linha da tabela
    createTableRow(item) {
        const row = document.createElement('tr');
        row.className = 'table-row border-b border-gray-100 fade-in';
        
        const modalidade = item.modalidade || item.Modalidade || '-';
        const comprador = item.comprador || item.Comprador || item.orgao || item.Orgao || '-';
        const objeto = item.objeto || item.Objeto || item.descricao || item.Descricao || '-';
        const valor = item.valor || item.Valor || item.valorNumerico || item.ValorNumerico || 0;
        const abertura = item.abertura || item.Abertura || item.data_abertura || item.DataAbertura || '';
        const tipologia = item.tipologia_oficial || item.tipologia || item.Tipologia || '-';
        const link = item.link_edital || item.link || item.Link || item.url || item.URL || '';
        
        row.innerHTML = `
            <td class="px-4 py-3 text-sm">${this.escapeHtml(modalidade)}</td>
            <td class="px-4 py-3 text-sm max-w-xs truncate" title="${this.escapeHtml(comprador)}">${this.escapeHtml(comprador)}</td>
            <td class="px-4 py-3 text-sm max-w-xs truncate" title="${this.escapeHtml(objeto)}">${this.escapeHtml(objeto)}</td>
            <td class="px-4 py-3 text-sm font-medium">${UI.formatCurrency(valor)}</td>
            <td class="px-4 py-3 text-sm">${UI.formatDate(abertura)}</td>
            <td class="px-4 py-3 text-sm">${this.escapeHtml(tipologia)}</td>
            <td class="px-4 py-3 text-sm">
                ${link ? `<a href="${this.escapeHtml(link)}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">🔗 Ver</a>` : '-'}
            </td>
        `;
        
        return row;
    },
    
    // Escape HTML para segurança
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },
    
    // Renderizar estatísticas
    renderStats(stats) {
        const elements = {
            totalLicitacoes: document.getElementById('totalLicitacoes'),
            valorTotal: document.getElementById('valorTotal'),
            valorMedio: document.getElementById('valorMedio'),
            totalCompradores: document.getElementById('totalCompradores')
        };
        
        if (elements.totalLicitacoes) {
            elements.totalLicitacoes.textContent = (stats.totalLicitacoes || 0).toLocaleString('pt-BR');
        }
        if (elements.valorTotal) {
            elements.valorTotal.textContent = UI.formatCurrency(stats.valorTotal || 0);
        }
        if (elements.valorMedio) {
            elements.valorMedio.textContent = UI.formatCurrency(stats.valorMedio || 0);
        }
        if (elements.totalCompradores) {
            elements.totalCompradores.textContent = (stats.totalCompradores || 0).toLocaleString('pt-BR');
        }
    },
    
    // Renderizar paginação
    renderPagination() {
        if (typeof Pagination !== 'undefined') {
            Pagination.render();
        } else {
            // Fallback básico
            const totalPages = Math.ceil(AppState.totalItems / AppState.pageSize);
            
            if (AppState.totalItems <= AppState.pageSize) {
                UI.hideSection('paginationSection');
                return;
            }
            
            UI.showSection('paginationSection');
            Debug.log('Paginação renderizada', 'info', { totalPages, currentPage: AppState.currentPage });
        }
    },
    
    // Tratar erro na busca
    handleError(error) {
        Debug.error(`❌ Erro na busca: ${error.message}`, error);
        
        if (UI.elements.resultsTableBody) {
            UI.elements.resultsTableBody.innerHTML = `
                <tr>
                    <td colspan="7" class="text-center py-10 text-red-500">
                        ❌ Erro: ${this.escapeHtml(error.message)}
                    </td>
                </tr>
            `;
        }
        
        if (UI.elements.resultsCount) {
            UI.elements.resultsCount.textContent = 'Erro na busca';
        }
        
        UI.showNotification(`Erro na busca: ${error.message}`, 'error');
    },
    
    // Atualizar métricas de performance
    updatePerformanceMetrics(duration, data) {
        AppState.lastSearchTime = duration;
        
        const stats = this.extractStats(data);
        UI.updateQuickStats(
            AppState.totalItems,
            stats.valorTotal,
            Math.round(duration),
            FilterManager ? FilterManager.countActiveFilters() : 0
        );
        
        UI.updateLastUpdate();
        
        const queryTimeDetailEl = document.getElementById('queryTimeDetail');
        if (queryTimeDetailEl) {
            queryTimeDetailEl.textContent = `${Math.round(duration)}ms`;
        }
    },
    
    // Limpeza final
    cleanup() {
        UI.hideLoader('searchBtn');
        this.inProgress = false;
        
        // Substituir ícones Feather se disponível
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    },
    
    // Busca rápida na tabela (filtro local)
    quickSearch(query) {
        if (!query) {
            this.renderResults(AppState.allResults);
            return;
        }
        
        const filtered = AppState.allResults.filter(item => {
            const searchText = `${item.modalidade || ''} ${item.comprador || ''} ${item.objeto || ''} ${item.tipologia_oficial || item.tipologia || ''}`.toLowerCase();
            return searchText.includes(query.toLowerCase());
        });
        
        this.renderResults(filtered);
        Debug.log(`Busca rápida: ${filtered.length} resultados para "${query}"`, 'info');
    },
    
    // Atualizar resultados (re-executar busca atual)
    async refresh() {
        Debug.log('🔄 Atualizando resultados...', 'info');
        await this.execute(AppState.currentPage);
    }
};

// Funções globais
window.Search = Search;
window.pesquisarLicitacoes = (page = 1) => Search.execute(page);
window.quickTableSearch = (query) => Search.quickSearch(query);
window.refreshResults = () => Search.refresh();

console.log('✅ SEARCH ENGINE: Motor de busca avançado carregado');
