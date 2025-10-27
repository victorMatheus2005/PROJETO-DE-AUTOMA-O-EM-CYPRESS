# Projeto: Machine Learning - Previsão de Desempenho Acadêmico

**Disciplina:** Introdução à Machine Learning - 2025.1
**Professor:** Professor Durval

---

## 📋 Sobre o Projeto

Bem-vindo ao seu projeto final de Machine Learning!

Você desenvolverá um modelo de **regressão** para prever o desempenho acadêmico final de estudantes universitários, utilizando dados sobre hábitos de estudo, condições socioeconômicas e características pessoais.

### 🎯 Objetivo

Criar um modelo que possa identificar estudantes em risco de baixo desempenho, permitindo intervenções preventivas como tutoria e aconselhamento acadêmico.

---

## 📊 Dataset

O dataset contém informações de **2.510 estudantes universitários** com 13 variáveis (features):

- **Dados demográficos:** idade, gênero, educação dos pais
- **Desempenho acadêmico:** notas anteriores, frequência, horas de estudo
- **Condições de estudo:** qualidade da internet, tutoria, atividades extracurriculares
- **Saúde e bem-estar:** horas de sono, estado de saúde
- **Contexto socioeconômico:** renda familiar

**Variável Alvo:** `final_grade` (nota final, 0-100 pontos)

📖 **Documentação completa:** Consulte `data/raw/README.md` para descrição detalhada de cada variável.

---

## 🚀 Como Começar

### 1. Setup do Ambiente

```bash
# Clonar o repositório (você já fez isso!)
cd [nome-do-seu-repositorio]

# Criar ambiente virtual
python -m venv venv

# Ativar ambiente
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate     # Windows

# Instalar dependências
pip install -r requirements.txt

# Verificar instalação
python -c "import pandas, numpy, sklearn; print('✅ Pronto!')"
```

### 2. Explorar o Dataset

```bash
# Iniciar Jupyter Notebook
jupyter notebook
```

O dataset está em: `data/raw/students_performance.csv`

### 3. Começar a Primeira Análise

**Código de exemplo para começar:**

Consulte `notebooks/00_EXEMPLO_STARTER.py` para ver um exemplo completo de código de Análise Exploratória de Dados (EDA).

Você pode:
- Copiar seções do código para seu notebook
- Usar como referência para sua própria análise
- Expandir com suas próprias visualizações e descobertas

---

## 📁 Estrutura do Repositório

```
.
├── data/
│   ├── raw/                    # Dataset original (NÃO MODIFICAR)
│   │   ├── students_performance.csv
│   │   └── README.md          # Documentação do dataset
│   └── processed/              # Seus dados processados (você cria)
│
├── notebooks/                  # Seus notebooks Jupyter
│   ├── 00_EXEMPLO_STARTER.py  # Código exemplo (ponto de partida)
│   └── README.md              # Guia dos notebooks
│
├── src/                        # Scripts Python (opcional)
│
├── docs/                       # Documentação adicional
│   ├── BOAS_PRATICAS.md       # Guia de boas práticas
│   └── TEMPLATE_RELATORIO_FINAL.md  # Template para relatório
│
├── requirements.txt            # Dependências do projeto
└── README.md                  # Este arquivo
```

---

## 📚 Documentação e Recursos

### Documentação Incluída no Projeto

- **`data/raw/README.md`** - Descrição completa do dataset
- **`notebooks/README.md`** - Guia para criar seus notebooks
- **`docs/BOAS_PRATICAS.md`** - Boas práticas de código e análise
- **`docs/TEMPLATE_RELATORIO_FINAL.md`** - Estrutura para relatório final

### Bibliotecas Principais

- **pandas** - Manipulação de dados
- **numpy** - Operações numéricas
- **matplotlib / seaborn** - Visualizações
- **scikit-learn** - Machine Learning
- **xgboost / lightgbm** - Modelos avançados

📖 Links úteis:
- [Pandas Documentation](https://pandas.pydata.org/docs/)
- [Scikit-learn User Guide](https://scikit-learn.org/stable/user_guide.html)
- [Seaborn Gallery](https://seaborn.pydata.org/examples/index.html)

---

## 🎓 Etapas do Projeto

O projeto está dividido em etapas semanais. Você receberá instruções específicas do professor para cada etapa.

### Visão Geral:

1. **Análise Exploratória (EDA)** - Conhecer e entender os dados
2. **Pré-processamento** - Limpar e preparar os dados
3. **Modelagem** - Treinar e comparar modelos
4. **Otimização e Relatório** - Ajustar modelo e documentar resultados

**📋 Instruções detalhadas de cada etapa serão fornecidas pelo professor.**

---

## ⚠️ Importante

### O Que Você DEVE Fazer:

- ✅ Criar seus próprios notebooks na pasta `notebooks/`
- ✅ Fazer commits regulares documentando seu progresso
- ✅ Consultar a documentação incluída no projeto
- ✅ Salvar dados processados em `data/processed/`
- ✅ Seguir as boas práticas descritas em `docs/BOAS_PRATICAS.md`

### O Que Você NÃO DEVE Fazer:

- ❌ Modificar arquivos em `data/raw/` (dados originais)
- ❌ Fazer commit de arquivos grandes (modelos `.pkl`, datasets processados grandes)
- ❌ Deixar código sem comentários
- ❌ Copiar código sem entender

---

## 🆘 Precisa de Ajuda?

1. **Dataset:** Consulte `data/raw/README.md`
2. **Como começar:** Veja `notebooks/00_EXEMPLO_STARTER.py`
3. **Boas práticas:** Leia `docs/BOAS_PRATICAS.md`
4. **Dúvidas técnicas:** Procure o professor
5. **Documentação oficial:** Links das bibliotecas acima

---

## 🏆 Dicas de Sucesso

- 📖 **Leia toda a documentação incluída** antes de começar
- 🔄 **Faça commits frequentes** com mensagens descritivas
- 📊 **Documente suas descobertas** em células markdown
- 🧪 **Teste seu código** antes de submeter
- 💡 **Seja criativo** na exploração dos dados
- 🤝 **Consulte a documentação** das bibliotecas

---

**Boa sorte e bom código!** 🚀

*Última atualização: Outubro 2027*
