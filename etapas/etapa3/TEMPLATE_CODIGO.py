"""
TEMPLATE - ETAPA 3: MODELO BASELINE
====================================

Este template guia você passo a passo na criação do modelo baseline.
Siga os comentários e preencha os TODOs.

OBJETIVO: Criar um modelo de Regressão Linear simples e avaliar sua performance.
"""

# ============================================================================
# IMPORTS
# ============================================================================

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
import joblib

# Configurações de visualização
plt.style.use('seaborn-v0_8-darkgrid')
sns.set_palette("husl")

# ============================================================================
# PASSO 1: CARREGAR DADOS LIMPOS
# ============================================================================
print("="*60)
print("ETAPA 3: MODELO BASELINE - REGRESSÃO LINEAR")
print("="*60)

# TODO: Ajuste o caminho para seu arquivo de dados limpos (da Etapa 2)
df = pd.read_csv('../../data/students_clean.csv')

print(f"\n✓ Dados carregados: {df.shape[0]} linhas, {df.shape[1]} colunas")

# Visualizar primeiras linhas
print("\nPrimeiras linhas:")
print(df.head())

# ============================================================================
# PASSO 2: SEPARAR FEATURES (X) e TARGET (y)
# ============================================================================

# TODO: Ajuste o nome da coluna target de acordo com seu dataset
TARGET_COLUMN = 'final_grade'  # Mude se necessário

# TODO: Liste aqui as colunas que você NÃO quer usar (ex: IDs, nome, etc.)
COLUNAS_REMOVER = ['student_id']  # Adicione outras se necessário

# Separar X (features) e y (target)
X = df.drop(columns=[TARGET_COLUMN] + COLUNAS_REMOVER, errors='ignore')
y = df[TARGET_COLUMN]

print(f"\n✓ Features (X): {X.shape[1]} colunas")
print(f"✓ Target (y): {y.shape[0]} valores")
print(f"\nFeatures utilizadas:")
print(X.columns.tolist())

# ============================================================================
# PASSO 3: DIVISÃO DOS DADOS (60% TREINO / 20% VALIDAÇÃO / 20% TESTE)
# ============================================================================

# IMPORTANTE: Usamos random_state para reprodutibilidade
RANDOM_STATE = 42

# Primeiro: separar 20% para teste (NÃO VAMOS USAR AGORA!)
X_temp, X_test, y_temp, y_test = train_test_split(
    X, y,
    test_size=0.2,  # 20% para teste
    random_state=RANDOM_STATE
)

# Segundo: dos 80% restantes, separar 25% para validação (que é 20% do total)
# 0.25 * 0.8 = 0.2 (20% do total)
X_train, X_val, y_train, y_val = train_test_split(
    X_temp, y_temp,
    test_size=0.25,  # 25% do temp = 20% do total
    random_state=RANDOM_STATE
)

# Verificar divisão
total_samples = len(X)
print("\n" + "="*60)
print("DIVISÃO DOS DADOS")
print("="*60)
print(f"Total de amostras: {total_samples}")
print(f"├─ Treino:     {len(X_train):4d} ({len(X_train)/total_samples*100:.1f}%)")
print(f"├─ Validação:  {len(X_val):4d} ({len(X_val)/total_samples*100:.1f}%)")
print(f"└─ Teste:      {len(X_test):4d} ({len(X_test)/total_samples*100:.1f}%)")

# Verificar distribuição do target nos 3 conjuntos
print("\nDistribuição do target:")
print(f"├─ Treino:     média={y_train.mean():.2f}, std={y_train.std():.2f}")
print(f"├─ Validação:  média={y_val.mean():.2f}, std={y_val.std():.2f}")
print(f"└─ Teste:      média={y_test.mean():.2f}, std={y_test.std():.2f}")

# Salvar datasets divididos (opcional, mas recomendado)
# TODO: Descomente se quiser salvar
# X_train.to_csv('../../data/X_train.csv', index=False)
# X_val.to_csv('../../data/X_val.csv', index=False)
# X_test.to_csv('../../data/X_test.csv', index=False)
# y_train.to_csv('../../data/y_train.csv', index=False)
# y_val.to_csv('../../data/y_val.csv', index=False)
# y_test.to_csv('../../data/y_test.csv', index=False)

# ============================================================================
# PASSO 4: CRIAR E TREINAR MODELO BASELINE (REGRESSÃO LINEAR)
# ============================================================================

print("\n" + "="*60)
print("TREINAMENTO DO MODELO")
print("="*60)

# Criar modelo
modelo = LinearRegression()

# Treinar modelo (fit = aprender os coeficientes)
print("\nTreinando modelo de Regressão Linear...")
modelo.fit(X_train, y_train)
print("✓ Modelo treinado!")

# Visualizar coeficientes aprendidos
print("\n" + "-"*60)
print("COEFICIENTES DO MODELO")
print("-"*60)

# Criar DataFrame com features e coeficientes
coeficientes = pd.DataFrame({
    'Feature': X_train.columns,
    'Coeficiente': modelo.coef_
}).sort_values('Coeficiente', key=abs, ascending=False)

print(coeficientes.to_string(index=False))
print(f"\nIntercept (nota base): {modelo.intercept_:.4f}")

# TODO: Interprete os 3 coeficientes mais importantes
print("\n📊 Interpretação:")
print(f"1. {coeficientes.iloc[0]['Feature']}: {coeficientes.iloc[0]['Coeficiente']:+.3f}")
print(f"   → Cada unidade a mais = {coeficientes.iloc[0]['Coeficiente']:+.3f} pontos na nota")
print(f"2. {coeficientes.iloc[1]['Feature']}: {coeficientes.iloc[1]['Coeficiente']:+.3f}")
print(f"3. {coeficientes.iloc[2]['Feature']}: {coeficientes.iloc[2]['Coeficiente']:+.3f}")

# ============================================================================
# PASSO 5: FAZER PREVISÕES
# ============================================================================

# Fazer previsões no treino
y_train_pred = modelo.predict(X_train)

# Fazer previsões na validação
y_val_pred = modelo.predict(X_val)

print("\n✓ Previsões realizadas em treino e validação")

# ============================================================================
# PASSO 6: CALCULAR MÉTRICAS DE AVALIAÇÃO
# ============================================================================

def calcular_metricas(y_true, y_pred, dataset_name=""):
    """
    Calcula e exibe métricas de regressão.

    Parâmetros:
        y_true: valores reais
        y_pred: valores previstos
        dataset_name: nome do conjunto (ex: "Treino", "Validação")

    Retorna:
        dict com as métricas
    """
    mse = mean_squared_error(y_true, y_pred)
    rmse = np.sqrt(mse)
    mae = mean_absolute_error(y_true, y_pred)
    r2 = r2_score(y_true, y_pred)

    print(f"\n{dataset_name}")
    print("-" * 40)
    print(f"MSE  (Mean Squared Error):     {mse:.4f}")
    print(f"RMSE (Root Mean Squared Error):{rmse:.4f}")
    print(f"MAE  (Mean Absolute Error):    {mae:.4f}")
    print(f"R²   (R-squared):              {r2:.4f}")

    return {
        'MSE': mse,
        'RMSE': rmse,
        'MAE': mae,
        'R²': r2
    }

# Calcular métricas
print("\n" + "="*60)
print("MÉTRICAS DE PERFORMANCE")
print("="*60)

metricas_treino = calcular_metricas(y_train, y_train_pred, "TREINO")
metricas_val = calcular_metricas(y_val, y_val_pred, "VALIDAÇÃO")

# Comparação lado a lado
print("\n" + "="*60)
print("COMPARAÇÃO TREINO vs VALIDAÇÃO")
print("="*60)

comparacao = pd.DataFrame({
    'Treino': metricas_treino,
    'Validação': metricas_val
})
comparacao['Diferença'] = abs(comparacao['Treino'] - comparacao['Validação'])

print(comparacao)

# Análise de Overfitting
diferenca_r2 = abs(metricas_treino['R²'] - metricas_val['R²'])
print("\n📊 Análise de Overfitting:")
if diferenca_r2 < 0.05:
    print(f"✅ Excelente! Diferença R² = {diferenca_r2:.3f} (< 0.05)")
    print("   O modelo generaliza muito bem!")
elif diferenca_r2 < 0.10:
    print(f"✅ Bom! Diferença R² = {diferenca_r2:.3f} (< 0.10)")
    print("   O modelo generaliza bem.")
elif diferenca_r2 < 0.20:
    print(f"⚠️  Atenção! Diferença R² = {diferenca_r2:.3f} (< 0.20)")
    print("   Há algum overfitting, mas aceitável.")
else:
    print(f"❌ Problema! Diferença R² = {diferenca_r2:.3f} (> 0.20)")
    print("   Overfitting significativo detectado!")

# TODO: Interprete o R² de validação
r2_val = metricas_val['R²']
print(f"\n📊 Interpretação do R²:")
print(f"R² = {r2_val:.3f} significa que o modelo explica {r2_val*100:.1f}% da variação no target.")

# ============================================================================
# PASSO 7: VISUALIZAÇÕES
# ============================================================================

print("\n" + "="*60)
print("CRIANDO VISUALIZAÇÕES")
print("="*60)

# GRÁFICO 1: Predições vs Valores Reais (OBRIGATÓRIO)
plt.figure(figsize=(10, 6))
plt.scatter(y_val, y_val_pred, alpha=0.6, edgecolors='k', linewidth=0.5)

# Linha diagonal (predição perfeita)
min_val = min(y_val.min(), y_val_pred.min())
max_val = max(y_val.max(), y_val_pred.max())
plt.plot([min_val, max_val], [min_val, max_val], 'r--', lw=2, label='Predição Perfeita')

plt.xlabel('Valores Reais', fontsize=12)
plt.ylabel('Valores Previstos', fontsize=12)
plt.title(f'Predições vs Valores Reais - Validação (R²={r2_val:.3f})', fontsize=14, fontweight='bold')
plt.legend()
plt.grid(True, alpha=0.3)
plt.tight_layout()

# TODO: Ajuste o caminho para salvar
plt.savefig('predicoes_vs_real.png', dpi=300, bbox_inches='tight')
print("✓ Gráfico 1 salvo: predicoes_vs_real.png")
plt.show()

# GRÁFICO 2: Distribuição dos Resíduos (RECOMENDADO)
residuos = y_val - y_val_pred

plt.figure(figsize=(10, 6))
plt.hist(residuos, bins=30, edgecolor='black', alpha=0.7)
plt.axvline(0, color='red', linestyle='--', linewidth=2, label='Zero (ideal)')
plt.xlabel('Resíduos (Real - Previsto)', fontsize=12)
plt.ylabel('Frequência', fontsize=12)
plt.title(f'Distribuição dos Resíduos (média={residuos.mean():.3f})', fontsize=14, fontweight='bold')
plt.legend()
plt.grid(True, alpha=0.3, axis='y')
plt.tight_layout()

# TODO: Ajuste o caminho para salvar
plt.savefig('distribuicao_residuos.png', dpi=300, bbox_inches='tight')
print("✓ Gráfico 2 salvo: distribuicao_residuos.png")
plt.show()

# GRÁFICO 3: Importância das Features (OPCIONAL)
plt.figure(figsize=(10, 8))
coef_plot = coeficientes.head(10)  # Top 10
plt.barh(coef_plot['Feature'], coef_plot['Coeficiente'])
plt.xlabel('Coeficiente', fontsize=12)
plt.ylabel('Feature', fontsize=12)
plt.title('Top 10 Features Mais Importantes', fontsize=14, fontweight='bold')
plt.axvline(0, color='black', linestyle='-', linewidth=0.5)
plt.grid(True, alpha=0.3, axis='x')
plt.tight_layout()

# TODO: Ajuste o caminho para salvar
plt.savefig('importancia_features.png', dpi=300, bbox_inches='tight')
print("✓ Gráfico 3 salvo: importancia_features.png")
plt.show()

# ============================================================================
# PASSO 8: ANÁLISE DE RESÍDUOS
# ============================================================================

print("\n" + "="*60)
print("ANÁLISE DE RESÍDUOS")
print("="*60)

print(f"\nEstatísticas dos Resíduos (Validação):")
print(f"├─ Média:         {residuos.mean():+.4f}  (ideal: ~0)")
print(f"├─ Mediana:       {residuos.median():+.4f}")
print(f"├─ Desvio Padrão: {residuos.std():.4f}")
print(f"├─ Mínimo:        {residuos.min():+.4f}")
print(f"└─ Máximo:        {residuos.max():+.4f}")

# Verificar normalidade (teste visual)
if abs(residuos.mean()) < 0.1:
    print("\n✅ Resíduos centrados em zero (média ≈ 0)")
else:
    print(f"\n⚠️  Resíduos NÃO centrados (média = {residuos.mean():.3f})")
    print("   Isso pode indicar viés no modelo.")

# ============================================================================
# PASSO 9: SALVAR MODELO
# ============================================================================

print("\n" + "="*60)
print("SALVANDO MODELO")
print("="*60)

# TODO: Ajuste o caminho onde quer salvar
modelo_path = 'baseline_model.pkl'
joblib.dump(modelo, modelo_path)
print(f"✓ Modelo salvo em: {modelo_path}")

# Para carregar depois:
# modelo_carregado = joblib.load('baseline_model.pkl')

# ============================================================================
# PASSO 10: RESUMO FINAL
# ============================================================================

print("\n" + "="*60)
print("RESUMO FINAL")
print("="*60)

print(f"""
📊 MÉTRICAS DE VALIDAÇÃO:
   ├─ R²:   {metricas_val['R²']:.3f} ({metricas_val['R²']*100:.1f}% da variância explicada)
   ├─ RMSE: {metricas_val['RMSE']:.3f} (erro médio em unidades do target)
   └─ MAE:  {metricas_val['MAE']:.3f}

🎯 OVERFITTING:
   └─ Diferença R²: {diferenca_r2:.3f} ({'OK' if diferenca_r2 < 0.10 else 'ATENÇÃO!'})

📈 TOP 3 FEATURES IMPORTANTES:
   1. {coeficientes.iloc[0]['Feature']}: {coeficientes.iloc[0]['Coeficiente']:+.3f}
   2. {coeficientes.iloc[1]['Feature']}: {coeficientes.iloc[1]['Coeficiente']:+.3f}
   3. {coeficientes.iloc[2]['Feature']}: {coeficientes.iloc[2]['Coeficiente']:+.3f}

💾 ARQUIVOS GERADOS:
   ├─ predicoes_vs_real.png
   ├─ distribuicao_residuos.png
   ├─ importancia_features.png
   └─ baseline_model.pkl
""")

print("="*60)
print("✅ ETAPA 3 CONCLUÍDA!")
print("="*60)

# ============================================================================
# PRÓXIMOS PASSOS
# ============================================================================

print("""
📝 PRÓXIMOS PASSOS:

1. Documente seus resultados no relatório (GUIA_STORYTELLING.md)
2. Interprete as métricas e os coeficientes
3. Analise os gráficos gerados
4. Identifique pontos de melhoria para a Etapa 4

🎯 META PARA ETAPA 4:
   - Superar R² = {:.3f}
   - Reduzir RMSE < {:.3f}
   - Testar modelos mais complexos (Random Forest, XGBoost)
""".format(metricas_val['R²'], metricas_val['RMSE']))

print("\nBom trabalho! 🚀")
