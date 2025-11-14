# Guia Completo - Etapa 3: Modelo Baseline

## 📖 Índice

1. [Por que Dividir Dados?](#1-por-que-dividir-dados)
2. [O que é Regressão Linear?](#2-o-que-é-regressão-linear)
3. [Métricas Explicadas em Detalhes](#3-métricas-explicadas-em-detalhes)
4. [Como Interpretar Gráficos](#4-como-interpretar-gráficos)
5. [Pseudo-Códigos e Fluxo de Trabalho](#5-pseudo-códigos-e-fluxo-de-trabalho)
6. [Guia de Storytelling](#6-guia-de-storytelling)
7. [Identificando Overfitting](#7-identificando-overfitting)
8. [Problemas Comuns](#8-problemas-comuns)

---

## 1. Por que Dividir Dados?

### A Analogia do Estudante

Imagine que você está estudando para uma prova:

```
📚 ESTUDAR EM CASA = TREINO (60%)
   └─ Você faz exercícios para aprender
   └─ Pode consultar o material
   └─ Pode errar e tentar de novo

📝 SIMULADO = VALIDAÇÃO (20%)
   └─ Testa se você realmente aprendeu
   └─ Não pode consultar nada
   └─ Mostra onde precisa melhorar

📃 PROVA FINAL = TESTE (20%)
   └─ Avaliação final
   └─ SÓ FAÇA UMA VEZ
   └─ Não estude por ela antes!
```

### No Machine Learning

```
Seus Dados (2,510 alunos = 100%)
│
├─ TREINO (1,506 alunos = 60%)
│  └─ Modelo "estuda" aqui
│  └─ Aprende os padrões
│
├─ VALIDAÇÃO (502 alunos = 20%)
│  └─ Você testa aqui
│  └─ Ajusta o modelo
│  └─ Decide se está bom
│
└─ TESTE (502 alunos = 20%)
   └─ Avaliação final
   └─ SÓ USA NA ETAPA 5!
   └─ NUNCA ANTES!
```

### ⚠️ O que NÃO fazer (Data Leakage)

```python
# ❌ ERRADO - Normalizar ANTES de dividir
scaler.fit(todos_os_dados)  # Modelo "viu" dados de teste!

# ✅ CERTO - Dividir ANTES de normalizar
treino, teste = dividir(dados)
scaler.fit(treino)  # Modelo só vê treino
```

**Regra de Ouro:** Modelo só pode "ver" dados de treino!

---

## 2. O que é Regressão Linear?

### Ideia Simples

Encontrar a **melhor linha reta** que relaciona suas features com o target.

```
Nota Final
    │
 10 │        ●
    │      ●   ●
  8 │    ●   /  ●   ← A linha (/) tenta passar perto
    │  ●   /           de todos os pontos (●)
  6 │   ●/    ●
    │  / ●
  4 │/  ●
    │
    └────────────────> Horas de Estudo
      0  2  4  6  8  10
```

### A Equação

```
Previsão = β₀ + β₁×Feature1 + β₂×Feature2 + ... + βₙ×Featureₙ

Onde:
β₀ = Intercept (nota base, sem nenhuma feature)
β₁, β₂, ... = Coeficientes (peso/importância de cada feature)
```

### Exemplo Numérico Real

Suponha que o modelo aprendeu:

```
Nota_Final = 5.0 + 0.8×horas_estudo + 1.2×tem_tutoria - 0.3×faltas
```

**Para um aluno com:**
- 10 horas de estudo
- Tem tutoria (1)
- 2 faltas

**Cálculo:**
```
Nota = 5.0 + 0.8×10 + 1.2×1 - 0.3×2
     = 5.0 + 8.0 + 1.2 - 0.6
     = 13.6 pontos
```

### Interpretando Coeficientes

```
Feature              Coeficiente    Interpretação
────────────────────────────────────────────────────────
horas_estudo         +0.8          Cada hora a mais = +0.8 pontos
tem_tutoria          +1.2          Ter tutoria = +1.2 pontos
faltas               -0.3          Cada falta = -0.3 pontos
educacao_pais        +0.5          Maior educação pais = +0.5
```

**Sinal positivo (+):** Aumenta o target
**Sinal negativo (-):** Diminui o target
**Maior magnitude:** Mais importante

---

## 3. Métricas Explicadas em Detalhes

### 3.1 R² (R-squared) - A MÉTRICA PRINCIPAL

#### O que é?
Proporção da variância explicada pelo modelo.

#### Como calcular? (conceitual)
```
1. Calcule erro se você usasse só a MÉDIA
2. Calcule erro do SEU MODELO
3. R² = 1 - (erro_modelo / erro_média)
```

#### Interpretação Visual

```
R² = 0.80 significa:

De cada 100 pontos de diferença entre alunos...
├─ 80 pontos seu modelo explica ✅
└─ 20 pontos são fatores que você não capturou ❓
```

#### Tabela de Interpretação

| R² | Significado | Ação |
|----|-------------|------|
| **1.00** | Perfeito (100%) | 🤔 Suspeito! Verifique data leakage |
| **0.90-0.99** | Excelente (90-99%) | 🎉 Ótimo modelo! |
| **0.70-0.89** | Bom (70-89%) | ✅ Modelo funcional |
| **0.50-0.69** | Razoável (50-69%) | ⚠️ Pode melhorar |
| **0.30-0.49** | Ruim (30-49%) | ❌ Revise features |
| **< 0.30** | Muito ruim | ❌ Quase inútil |
| **< 0** | Péssimo | 😱 Pior que prever a média! |

#### Exemplo Prático
```
R² = 0.72 no seu projeto significa:

"Meu modelo explica 72% das diferenças nas notas dos alunos.
 Os outros 28% são fatores que não capturei (ex: motivação pessoal,
 saúde mental, etc.)"
```

---

### 3.2 RMSE (Root Mean Squared Error)

#### O que é?
Raiz quadrada da média dos erros ao quadrado.

#### Por que usar?
- Está na **mesma unidade** do target (pontos de nota)
- Penaliza MUITO erros grandes
- Fácil de interpretar

#### Como funciona?

```
Aluno   Real   Previsto   Erro   Erro²
────────────────────────────────────────
  1      8.0      7.5     0.5    0.25
  2      6.5      7.0    -0.5    0.25
  3      9.0      8.0     1.0    1.00
  4      7.0      6.5     0.5    0.25
────────────────────────────────────────
Média dos Erro²:                 0.4375
RMSE = √0.4375 = 0.66 pontos
```

#### Interpretação por Contexto

| Escala Target | RMSE Excelente | RMSE Bom | RMSE Ruim |
|---------------|----------------|----------|-----------|
| **0-10 (notas)** | < 0.8 | < 1.5 | > 2.5 |
| **0-100 (%s)** | < 8 | < 15 | > 25 |
| **0-1000 (vendas)** | < 80 | < 150 | > 250 |

#### Exemplo Prático
```
RMSE = 1.3 pontos (escala 0-10)

Significa:
"Em média, minhas previsões erram por 1.3 pontos.
 Isso é 13% de erro numa escala de 10 pontos."
```

---

### 3.3 MAE (Mean Absolute Error)

#### O que é?
Média dos valores absolutos dos erros.

#### Diferença para RMSE?
```
MAE:  Trata todos erros igual
RMSE: Penaliza MUITO erros grandes (por causa do quadrado)

Exemplo:
Erros = [0.5, 0.5, 0.5, 5.0]

MAE  = (0.5 + 0.5 + 0.5 + 5.0) / 4 = 1.625
RMSE = √((0.25 + 0.25 + 0.25 + 25) / 4) = 2.55

RMSE >> MAE indica alguns erros MUITO grandes!
```

#### Quando usar MAE?
- Quando outliers não são tão problemáticos
- Quando você quer erro "típico" sem penalizar extremos
- Para comunicação simples (mais fácil de entender)

---

### 3.4 MSE (Mean Squared Error)

#### O que é?
Média dos erros ao quadrado.

#### Por que existe?
- Usado internamente em otimização
- RMSE é só √MSE (mais fácil de interpretar)

#### Na prática
**Use MSE para:** Comparar modelos (internamente)
**Use RMSE para:** Interpretar e comunicar

---

### 🎯 Resumo das Métricas

```
┌─────────────────────────────────────────────────────┐
│ Use R² para:    "Quanto % explico?"                 │
│ Use RMSE para:  "Qual meu erro médio?"              │
│ Use MAE para:   "Erro típico sem penalizar extremos"│
│ Use MSE para:   Comparações internas                │
└─────────────────────────────────────────────────────┘
```

---

## 4. Como Interpretar Gráficos

### Gráfico 1: Predições vs Valores Reais ⭐ PRINCIPAL

#### Como criar?
```python
plt.scatter(y_real, y_previsto)
plt.plot([min, max], [min, max], 'r--')  # Linha diagonal
```

#### O que você vê:

```
Previsto
    │
 10 │        ●              Legenda:
    │      ● │ ●            ● = Um aluno
  8 │    ●  │/  ●           / = Linha de predição perfeita
    │  ●   /│
  6 │   ● / │ ●            Pontos NA LINHA = previsão perfeita
    │  ● /  │              Pontos LONGE = erro grande
  4 │  /  ● │
    │ /     │
  2 │/──────│────────
    └───────────────────> Real
      2  4  6  8  10
```

#### O que procurar:

| Observação | Significado |
|------------|-------------|
| **Pontos perto da linha diagonal** | ✅ Boas previsões |
| **Pontos espalhados longe** | ❌ Previsões ruins |
| **Pontos acima da linha** | Modelo subestimou (previu menos) |
| **Pontos abaixo da linha** | Modelo superestimou (previu mais) |
| **Padrão em curva** | ❌ Relação não-linear (precisa transformar) |

---

### Gráfico 2: Distribuição de Resíduos

#### O que são resíduos?
```
Resíduo = Valor Real - Valor Previsto

Aluno tinha 8.0, você previu 7.5 → Resíduo = +0.5
Aluno tinha 6.0, você previu 6.8 → Resíduo = -0.8
```

#### Como deve parecer (IDEAL):

```
Frequência
    │
 30 │      ╱│╲              ✅ Formato de sino (normal)
    │    ╱  │  ╲            ✅ Centrado em zero
 20 │   ╱   │   ╲           ✅ Simétrico
    │  ╱    │    ╲
 10 │ ╱     │     ╲
    │╱      │      ╲
  0 ├───────┼───────┼──> Resíduos
         -3  0  +3
```

#### O que procurar:

| Propriedade | Ideal | Problema |
|-------------|-------|----------|
| **Média** | ≈ 0 | ≠ 0 → Modelo tem viés |
| **Formato** | Sino (normal) | Assimétrico → Transformar target |
| **Simetria** | Simétrico | Pendendo para um lado → Viés |

---

### Gráfico 3: Resíduos vs Predições (Opcional)

#### O que procurar:

```
IDEAL (sem padrão):
Resíduos
    │  ●   ●     ●
 +2 │    ●   ●
    │  ●   ●   ●
  0 ├─●─●─●─●─●─●─●─●  ✅ Aleatório
    │  ●   ●   ●
 -2 │    ●   ●
    │  ●   ●     ●
    └──────────────────> Predições


RUIM (formato de funil):
Resíduos
    │        ╱ ●
 +2 │      ╱ ●
    │    ╱  ●
  0 ├──╱●─●─●──────  ❌ Variância aumenta
    │  ╱ ●           (heterocedasticidade)
 -2 │╱  ●
    │
    └──────────────────> Predições
```

---

## 5. Pseudo-Códigos e Fluxo de Trabalho

### Fluxo Completo (Conceitual)

```
┌──────────────────────────────────────────┐
│ PASSO 1: CARREGAR DADOS LIMPOS           │
│ (da Etapa 2)                             │
└──────────────────────────────────────────┘
           ↓
┌──────────────────────────────────────────┐
│ PASSO 2: SEPARAR X (features) e y       │
│                                          │
│ X = tudo menos target                   │
│ y = só o target                          │
└──────────────────────────────────────────┘
           ↓
┌──────────────────────────────────────────┐
│ PASSO 3: DIVIDIR EM 3 CONJUNTOS         │
│                                          │
│ [100%] → [80% temp] + [20% teste]       │
│ [80% temp] → [60% treino] + [20% val]   │
└──────────────────────────────────────────┘
           ↓
┌──────────────────────────────────────────┐
│ PASSO 4: CRIAR MODELO                   │
│                                          │
│ modelo = RegressãoLinear()              │
│ modelo.fit(X_treino, y_treino)          │
│                                          │
│ O modelo aprendeu os coeficientes β!     │
└──────────────────────────────────────────┘
           ↓
┌──────────────────────────────────────────┐
│ PASSO 5: FAZER PREVISÕES                │
│                                          │
│ prev_treino = modelo.predict(X_treino)   │
│ prev_val = modelo.predict(X_val)         │
└──────────────────────────────────────────┘
           ↓
┌──────────────────────────────────────────┐
│ PASSO 6: CALCULAR MÉTRICAS              │
│                                          │
│ Para TREINO:                             │
│   R² = r2_score(y_treino, prev_treino)  │
│   RMSE = √mse(y_treino, prev_treino)    │
│                                          │
│ Para VALIDAÇÃO:                          │
│   R² = r2_score(y_val, prev_val)        │
│   RMSE = √mse(y_val, prev_val)          │
└──────────────────────────────────────────┘
           ↓
┌──────────────────────────────────────────┐
│ PASSO 7: COMPARAR TREINO VS VALIDAÇÃO   │
│                                          │
│ SE |R²_treino - R²_val| < 0.10:         │
│    ✅ Sem overfitting                    │
│ SENÃO:                                   │
│    ❌ Tem overfitting                    │
└──────────────────────────────────────────┘
           ↓
┌──────────────────────────────────────────┐
│ PASSO 8: ANALISAR RESÍDUOS              │
│                                          │
│ residuos = y_val - prev_val              │
│                                          │
│ Verificar:                               │
│   - Média ≈ 0?                           │
│   - Distribuição normal?                 │
└──────────────────────────────────────────┘
           ↓
┌──────────────────────────────────────────┐
│ PASSO 9: CRIAR GRÁFICOS                 │
│                                          │
│ 1. Predições vs Real                     │
│ 2. Distribuição de resíduos              │
└──────────────────────────────────────────┘
           ↓
┌──────────────────────────────────────────┐
│ PASSO 10: SALVAR MODELO E DOCUMENTAR    │
│                                          │
│ joblib.dump(modelo, 'baseline.pkl')      │
│ Escrever relatório com storytelling      │
└──────────────────────────────────────────┘
```

### Pseudo-código Detalhado

```python
# ========================================
# PSEUDO-CÓDIGO CONCEITUAL
# ========================================

# 1. Carregar dados
dados = ler_csv("dados_limpos.csv")

# 2. Separar X e y
X = dados[todas_colunas_menos_target]
y = dados[coluna_target]

# 3. Dividir dados
temp, teste = dividir(X, y, test_size=20%)
treino, validacao = dividir(temp, test_size=25%)  # 25% de 80% = 20% do total

# 4. Criar e treinar modelo
modelo = RegressaoLinear()
modelo.aprender(X_treino, y_treino)

# 5. Fazer previsões
previsoes_treino = modelo.prever(X_treino)
previsoes_val = modelo.prever(X_validacao)

# 6. Calcular métricas
metricas_treino = {
    R2: calcular_r2(y_treino, previsoes_treino),
    RMSE: calcular_rmse(y_treino, previsoes_treino)
}

metricas_val = {
    R2: calcular_r2(y_validacao, previsoes_val),
    RMSE: calcular_rmse(y_validacao, previsoes_val)
}

# 7. Verificar overfitting
diferenca_r2 = abs(metricas_treino.R2 - metricas_val.R2)

SE diferenca_r2 < 0.10:
    print("✅ Modelo generaliza bem")
SENÃO:
    print("❌ Overfitting detectado")

# 8. Analisar resíduos
residuos = y_validacao - previsoes_val

SE média(residuos) ≈ 0:
    print("✅ Resíduos sem viés")
SENÃO:
    print("⚠️ Modelo tem viés")

# 9. Criar gráficos
grafico1 = plotar(previsoes_val vs y_validacao)
grafico2 = histograma(residuos)

# 10. Salvar e documentar
salvar_modelo(modelo, "baseline.pkl")
escrever_relatorio(metricas, graficos, interpretacoes)
```

---

## 6. Guia de Storytelling

### Por que Storytelling é Importante?

**Código bom não basta.** Você precisa **comunicar** o que descobriu!

> "Dados contam fatos. Histórias convencem pessoas."

### Estrutura de Apresentação (5 Passos)

```
1. CONTEXTO → Por que isso importa?
2. DADOS → O que você tinha?
3. MÉTODO → Como você fez?
4. RESULTADOS → O que descobriu?
5. CONCLUSÕES → O que isso significa?
```

---

### 1. CONTEXTO (O Problema)

#### ❌ Ruim (muito técnico)
"Implementei um modelo de regressão linear com 15 features."

#### ✅ Bom (conta história)
"Queríamos prever o desempenho de estudantes para identificar quem precisa de apoio pedagógico **antes** das provas finais, permitindo intervenção precoce."

**Template:**
```markdown
## Contexto

Nosso objetivo é [OBJETIVO] para [BENEFÍCIO/IMPACTO].
Isso permitiria [AÇÃO CONCRETA].
```

---

### 2. DADOS (O que Você Tinha)

#### Template
```markdown
## Dados

- **Dataset:** [Nome] ([N] amostras)
- **Target:** [Nome da variável] (escala [min-max])
- **Features:** [N] variáveis ([X] numéricas, [Y] categóricas)
  - Exemplos: [listar 3-4 principais]
- **Divisão:** 60% treino ([N]) / 20% validação ([N]) / 20% teste ([N])
```

**Exemplo:**
```markdown
## Dados

- **Dataset:** Student Performance (2,510 alunos)
- **Target:** Nota final (escala 0-10 pontos)
- **Features:** 15 variáveis (8 numéricas, 7 categóricas)
  - Exemplos: horas de estudo, tutoria, educação dos pais, faltas
- **Divisão:** 60% treino (1,506) / 20% validação (502) / 20% teste (502)
```

---

### 3. MÉTODO (Como Você Fez)

#### ❌ Ruim (jargão técnico excessivo)
"Aplicamos um estimador linear com minimização de MSE via OLS."

#### ✅ Bom (claro e acessível)
"Usamos **Regressão Linear** para encontrar a relação entre as variáveis (como horas de estudo) e a nota final. É um modelo simples, mas serve como **baseline** para comparações futuras."

**Template:**
```markdown
## Metodologia

Implementamos uma **Regressão Linear** para [OBJETIVO].

**Por que este modelo?**
- Simples e interpretável
- Serve como baseline para modelos futuros
- Permite identificar features mais importantes

**Processo:**
1. Divisão dos dados (60/20/20)
2. Treinamento no conjunto de treino
3. Avaliação no conjunto de validação
4. Análise de resíduos e features
```

---

### 4. RESULTADOS (O que Descobriu)

#### A. Tabela de Métricas (OBRIGATÓRIO)

```markdown
## Resultados

| Métrica | Treino | Validação | Diferença |
|---------|--------|-----------|-----------|
| R²      | 0.75   | 0.72      | 0.03      |
| RMSE    | 1.25   | 1.32      | 0.07      |
| MAE     | 1.02   | 1.08      | 0.06      |
```

#### B. Interpretação em Palavras (OBRIGATÓRIO)

```markdown
### Interpretação

- **R² = 0.72** → O modelo explica **72%** da variação nas notas finais
  - Ou seja: de cada 100 pontos de diferença entre alunos, conseguimos explicar 72

- **RMSE = 1.32** → Erro médio de **1.3 pontos** numa escala de 0-10
  - Contexto: Se um aluno tirou 7.0, provavelmente prevemos entre 5.7 e 8.3
  - Isso representa 13% de erro

- **Diferença R² = 0.03** → Modelo **generaliza bem** (sem overfitting)
  - Performance similar em treino e validação
```

#### C. Gráfico Principal (OBRIGATÓRIO)

```markdown
### Gráfico: Predições vs Valores Reais

![Predições vs Real](img/pred_vs_real.png)

**Análise:** A maioria dos pontos está próxima à linha diagonal (predição perfeita),
indicando que o modelo faz boas previsões. Alguns outliers aparecem nas notas extremas
(muito baixas ou muito altas), sugerindo que casos extremos são mais difíceis de prever.
```

#### D. Features Importantes (RECOMENDADO)

```markdown
### Variáveis Mais Importantes

| Feature           | Coeficiente | Interpretação |
|-------------------|-------------|---------------|
| horas_estudo      | +0.82       | Cada hora a mais = +0.8 pontos |
| tem_tutoria       | +1.15       | Tutoria adiciona ~1.2 pontos |
| faltas            | -0.28       | Cada falta reduz 0.3 pontos |
| educacao_pais     | +0.45       | Pais com mais educação = +0.5 pontos |

**Insight chave:** Horas de estudo e tutoria são os fatores mais importantes para
o desempenho acadêmico neste dataset.
```

---

### 5. CONCLUSÕES (O que Isso Significa)

#### Template Completo

```markdown
## Conclusões

### Principais Descobertas

1. **O modelo baseline funciona razoavelmente bem** (R²=0.72), explicando
   mais de 70% da variação nas notas

2. **Não há overfitting** - performance similar em treino e validação
   (diferença R² = 0.03)

3. **Horas de estudo** é o fator mais importante, seguido de tutoria e
   educação dos pais

### Limitações

- Erro médio de 1.3 pontos ainda é significativo (13%)
- Modelo linear pode estar perdendo relações não-lineares
- Cases extremos (notas < 4 ou > 9) são mais difíceis de prever

### Próximos Passos

**Etapa 4: Modelos Avançados**
- Testar Random Forest e XGBoost (capturar não-linearidades)
- Criar features de interação (ex: estudo × tutoria)
- Otimizar hiperparâmetros
- **Meta:** R² > 0.80 e RMSE < 1.0
```

---

### Exemplo Completo de Relatório

```markdown
# Etapa 3: Modelo Baseline - Previsão de Desempenho Acadêmico

## 1. Contexto

Nosso objetivo é prever o desempenho de estudantes universitários com base
em suas características e hábitos de estudo. Isso permitiria à instituição
identificar alunos em risco **antes** das provas finais e oferecer suporte
pedagógico direcionado.

## 2. Dados

- **Dataset:** Student Performance
- **Amostras:** 2,510 alunos
- **Target:** Nota final (escala 0-10)
- **Features:** 15 variáveis incluindo horas de estudo, tutoria, faltas, etc.
- **Divisão:** 60% treino / 20% validação / 20% teste (guardado)

## 3. Metodologia

Implementamos uma **Regressão Linear** como modelo baseline. Este modelo
busca a relação linear entre as features e a nota final. Escolhemos começar
com um modelo simples para:

1. Estabelecer um benchmark para modelos futuros
2. Entender quais variáveis são mais importantes
3. Verificar se há relação linear nos dados

## 4. Resultados

### Métricas de Performance

| Métrica | Treino | Validação | Interpretação |
|---------|--------|-----------|---------------|
| R²      | 0.75   | 0.72      | Explica 72% da variação |
| RMSE    | 1.25   | 1.32      | Erro médio de 1.3 pontos |
| MAE     | 1.02   | 1.08      | Erro absoluto de 1.1 pontos |

### Análise de Overfitting

A diferença entre treino e validação é mínima (0.03 em R²), indicando
que o modelo **generaliza bem** e não está decorando os dados de treino.

### Predições vs Valores Reais

![Gráfico](img/pred_vs_real.png)

Os pontos concentram-se ao redor da linha diagonal, mostrando boa correlação
entre valores previstos e reais. Alguns outliers aparecem em notas extremas.

### Variáveis Mais Importantes

| Feature          | Efeito na Nota | Interpretação |
|------------------|----------------|---------------|
| horas_estudo     | +0.82 pontos/hora | Fator #1 |
| tem_tutoria      | +1.15 pontos | Fator #2 |
| faltas           | -0.28 pontos/falta | Impacto negativo |

**Insight:** Estudar mais horas e ter tutoria são os principais preditores
de sucesso acadêmico neste dataset.

## 5. Conclusões

### O que Funcionou ✅

- Modelo baseline atinge R²=0.72 (bom para primeiro modelo)
- Não há overfitting (diferença < 0.05)
- Identificamos variáveis-chave (horas de estudo, tutoria)

### Limitações ⚠️

- Erro médio de 1.3 pontos é razoável, mas pode melhorar
- Modelo linear pode não capturar relações complexas
- Performance pior em notas extremas (< 4 ou > 9)

### Próximos Passos 🚀

1. **Etapa 4:** Testar Random Forest e XGBoost
2. Criar features de interação (ex: estudo × tutoria)
3. Tentar capturar não-linearidades
4. **Meta:** R² > 0.80 e RMSE < 1.0

---

**Equipe:** [Seu Nome]
**Data:** 13/11/2025
**Código:** [link para GitHub]
```

---

## 7. Identificando Overfitting

### O que é Overfitting?

**Analogia:** Você decora as respostas dos exercícios ao invés de entender os conceitos.
Vai bem nos exercícios, mas mal no simulado (validação) e na prova (teste).

### Visual Conceitual

```
UNDERFITTING          BOM AJUSTE         OVERFITTING
(Muito simples)      (Equilibrado)      (Muito complexo)

    ●                    ●                    ●
  ●   ●                ●   ●                ●╱ ╲●
 ●  /  ●             ●  ╱  ●             ●╱   ╲●
●  /    ●           ●  ╱   ●            ╱●     ●╲
  /                   ╱                ╱         ╲

Não aprende     Aprende padrões    Decora ruído
```

### Como Detectar?

#### Método 1: Comparar R²

```
┌────────────────────────────────────────────────────┐
│ Situação           │ R² Treino │ R² Val │ Status  │
├────────────────────┼───────────┼────────┼─────────┤
│ Ideal              │   0.75    │  0.73  │ ✅ Bom  │
│ Overfitting Leve   │   0.80    │  0.68  │ ⚠️      │
│ Overfitting Severo │   0.95    │  0.45  │ ❌ Ruim │
│ Underfitting       │   0.30    │  0.28  │ ❌ Ruim │
└────────────────────────────────────────────────────┘

Regra:
Diferença = |R² treino - R² validação|

< 0.05 → Excelente
< 0.10 → Bom
< 0.20 → Aceitável
> 0.20 → Overfitting!
```

#### Método 2: Comparar RMSE

```
RMSE treino << RMSE validação → Overfitting

Exemplo:
RMSE treino = 0.5, RMSE val = 2.8 → ❌ Overfitting severo
```

### O que Fazer se Tiver Overfitting?

**Nesta etapa (Etapa 3):**
- ✅ **Documente** no relatório
- ✅ Explique que identificou o problema
- ✅ É esperado em modelos simples

**Na próxima etapa (Etapa 4):**
- Usar regularização (Ridge, Lasso)
- Reduzir features correlacionadas
- Aumentar dados de treino (se possível)
- Validação cruzada

---

## 8. Problemas Comuns

### Problema 1: R² Negativo

**Sintoma:**
```
R² = -0.15
```

**Significado:** Seu modelo é PIOR que simplesmente prever a média!

**Causas possíveis:**
- Dados não foram normalizados (Etapa 2)
- Features não têm relação com target
- Bug no código (treinou em um conjunto, testou em outro)

**Solução:**
1. Revisar pré-processamento (Etapa 2)
2. Verificar correlação entre features e target (Etapa 1)
3. Revisar código de divisão dos dados

---

### Problema 2: RMSE Muito Alto

**Sintoma:**
```
RMSE = 5.0 (com notas de 0-10)
→ Erro médio de 50%!
```

**Causas:**
- Features ruins (não explicam o target)
- Outliers não tratados
- Dados de qualidade ruim

**Solução:**
1. Voltar para EDA (Etapa 1) - verificar correlações
2. Revisar tratamento de outliers (Etapa 2)
3. Considerar criar novas features (feature engineering)

---

### Problema 3: Resíduos com Média ≠ 0

**Sintoma:**
```
Média dos resíduos = -2.5
```

**Significado:** Modelo tem viés (tende a prever valores maiores ou menores)

**Solução:**
- Verificar se target foi normalizado corretamente
- Revisar distribuição do target (muito assimétrica?)
- Considerar transformação (log, sqrt)

---

### Problema 4: Modelo "Perfeito" (R² = 1.0)

**Sintoma:**
```
R² treino = 1.00
```

**⚠️ SUSPEITO!** Provavelmente data leakage!

**Causas:**
- Incluiu a variável target nas features (ex: `final_grade` em X)
- Incluiu feature que "vaza" informação (ex: `id` correlacionado com target)
- Normalizou ANTES de dividir dados

**Solução:**
1. Revisar quais colunas estão em X
2. Verificar correlações muito altas (> 0.99)
3. Garantir que dividiu dados ANTES de qualquer transformação

---

## ✅ Checklist Final

Ao terminar a Etapa 3, você deve:

### Conceitos
- [ ] Sabe explicar por que dividir dados em 3 conjuntos
- [ ] Entende o que cada métrica significa (R², RMSE, MAE)
- [ ] Consegue identificar overfitting
- [ ] Sabe interpretar gráficos de resíduos

### Implementação
- [ ] Dividiu dados corretamente (60/20/20)
- [ ] Treinou modelo de Regressão Linear
- [ ] Calculou 4 métricas (MSE, RMSE, MAE, R²)
- [ ] Comparou treino vs validação
- [ ] Gerou pelo menos 2 gráficos

### Storytelling
- [ ] Escreveu contexto (por quê?)
- [ ] Descreveu dados (o quê?)
- [ ] Explicou método (como?)
- [ ] **Interpretou** resultados (não só listou números)
- [ ] Escreveu conclusões e próximos passos

---

**Parabéns por chegar até aqui! 🎉**

Agora vá para o `TEMPLATE_CODIGO.py` e implemente seu modelo!

---

Última atualização: Novembro 2025
