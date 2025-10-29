# 🚀 Início Rápido - Projeto ML

**Bem-vindo ao projeto de Machine Learning!** Este guia vai te ajudar a começar em **5 minutos**.

---

## ⚡ Setup em 5 Passos

### 1️⃣ Clone o Repositório
```bash
# Substitua [SEU-USUARIO] e [NOME-REPO] pelos valores corretos
git clone https://github.com/[SEU-USUARIO]/[NOME-REPO].git
cd [NOME-REPO]
```

### 2️⃣ Crie o Ambiente Virtual
```bash
# Criar ambiente virtual
python -m venv venv

# Ativar (Linux/Mac)
source venv/bin/activate

# Ativar (Windows)
venv\Scripts\activate
```

### 3️⃣ Instale as Dependências
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

### 4️⃣ Abra o Jupyter Notebook
```bash
# Opção 1: Jupyter Lab (recomendado)
jupyter lab

# Opção 2: Jupyter Notebook
jupyter notebook

# Opção 3: VS Code (se tiver extensão Python instalada)
code .
```

### 5️⃣ Escolha seu Dataset
1. Abra o arquivo **`data/datasets/README.md`**
2. Leia a descrição dos **10 datasets** disponíveis
3. Discuta com o grupo e escolha **1 dataset**
4. Informe ao professor qual dataset escolheu

---

## 📂 Estrutura do Projeto

```
seu-repositorio/
├── data/
│   ├── datasets/           ⭐ 10 DATASETS DISPONÍVEIS - Escolha 1!
│   │   ├── students_performance.csv
│   │   ├── ecommerce_sales.csv
│   │   ├── salary_prediction.csv
│   │   ├── ... (mais 7 opções)
│   │   └── README.md       📖 LEIA ISSO PRIMEIRO!
│   └── processed/          (você cria na Etapa 2)
│
├── notebooks/              💻 Seus notebooks Jupyter vão aqui
│   ├── 00_EXEMPLO_STARTER.py
│   └── README.md
│
├── etapas/                 📝 Instruções de cada semana
│   ├── etapa1/            (Semana 1: EDA)
│   ├── etapa2/            (Semana 2: Pré-processamento)
│   ├── etapa3/            (Semana 3: Modelagem)
│   ├── etapa4/            (Semana 4: Otimização)
│   └── etapa5/            (Semana 5: Apresentação Final)
│
├── docs/                   📚 Documentação útil
│   ├── BOAS_PRATICAS.md
│   └── template_relatorio.md
│
├── models/                 🤖 Modelos salvos (você cria na Etapa 4)
└── src/                    🔧 Código reutilizável (opcional)
```

---

## 📅 Cronograma Resumido

| Semana | Etapa | O que fazer | Apresentação |
|:------:|-------|-------------|:------------:|
| **1** | EDA | Explorar dados, fazer análises | ✅ Sim |
| **2** | Pré-processamento | Limpar dados, criar features | ✅ 10 min |
| **3** | Modelagem | Treinar modelos, comparar | ✅ 15 min |
| **4** | Otimização | Otimizar hiperparâmetros | ✅ 15 min |
| **5** | Apresentação | Relatório final + apresentação | ✅ 20-25 min |

---

## 🎯 Próximos Passos (AGORA!)

### ✅ Passo 1: Leia o README Principal
**Arquivo:** `README.md` na raiz do projeto
- Entenda o objetivo geral
- Veja todas as 5 etapas

### ✅ Passo 2: Escolha o Dataset
**Arquivo:** `data/datasets/README.md`
- Leia a descrição dos 10 datasets
- Discuta com o grupo
- **Escolha 1 dataset** para usar em TODAS as etapas

### ✅ Passo 3: Leia as Instruções da Etapa 1
**Arquivo:** `etapas/etapa1/README.md`
- Contém 47 questões investigativas
- Análises obrigatórias detalhadas
- Critérios de avaliação

### ✅ Passo 4: Comece a Trabalhar!
1. Crie um notebook: `notebooks/01_EDA.ipynb`
2. Carregue o dataset escolhido
3. Siga as instruções da Etapa 1
4. Não copie código pronto - **pesquise e aprenda!**

---

## 💡 Dicas Importantes

### ✅ Faça
- ✅ Leia a documentação do Pandas antes de começar
- ✅ Commit frequentemente no Git
- ✅ Discuta as decisões em grupo
- ✅ Peça ajuda ao professor quando travar
- ✅ Documente suas decisões no notebook

### ❌ Não Faça
- ❌ Copiar código pronto sem entender
- ❌ Modificar os datasets originais em `data/datasets/`
- ❌ Deixar tudo para a última hora
- ❌ Trabalhar sozinho - é um projeto em GRUPO!

---

## 📚 Recursos Úteis

### Documentação Oficial
- [Pandas Documentation](https://pandas.pydata.org/docs/)
- [Scikit-learn Documentation](https://scikit-learn.org/stable/)
- [Matplotlib Documentation](https://matplotlib.org/stable/)
- [Seaborn Tutorial](https://seaborn.pydata.org/tutorial.html)

### Tutoriais Recomendados
- [10 Minutes to Pandas](https://pandas.pydata.org/docs/user_guide/10min.html)
- [Pandas Cheat Sheet](https://pandas.pydata.org/Pandas_Cheat_Sheet.pdf)
- [Scikit-learn User Guide](https://scikit-learn.org/stable/user_guide.html)

### Dentro do Projeto
- `docs/BOAS_PRATICAS.md` - Guia de código limpo
- `notebooks/00_EXEMPLO_STARTER.py` - Exemplo básico

---

## 🆘 Precisa de Ajuda?

### Antes de Perguntar
1. ✅ Leu o `README.md` principal?
2. ✅ Leu o `etapas/etapaX/README.md` da etapa atual?
3. ✅ Pesquisou na documentação oficial?
4. ✅ Discutiu com o grupo?
---

## 🎓 Filosofia do Projeto

> **"Você está aqui para APRENDER, não apenas para ENTREGAR."**

- 📖 **Pesquise** antes de perguntar
- 💭 **Entenda** antes de implementar
- 🤝 **Discuta** com o grupo
- 📝 **Documente** suas decisões
- 🔄 **Itere** e melhore continuamente

---

## ✅ Checklist Final

Antes de começar a trabalhar, verifique:

- [ ] Ambiente virtual criado e ativado
- [ ] Dependências instaladas (`pip install -r requirements.txt`)
- [ ] Jupyter Notebook/Lab funcionando
- [ ] Leu `README.md` principal
- [ ] Leu `data/datasets/README.md` e escolheu 1 dataset
- [ ] Leu `etapas/etapa1/README.md`
- [ ] Criou o repositório no GitHub (se ainda não tiver)
- [ ] Adicionou todos os membros do grupo como colaboradores

---

## 🚀 Você está pronto!

Agora é só começar! 🎉

**Primeiro arquivo a abrir:** `etapas/etapa1/README.md`

**Boa sorte e bom trabalho!** 💪

---
