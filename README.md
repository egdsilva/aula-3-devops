# Aula 3 - DevOps com Testes, Quality Gates e IA

## Objetivo do projeto

Este projeto demonstra uma esteira DevOps para um sistema Node.js + TypeScript simples, com foco em:

- qualidade de código por meio de testes automatizados e cobertura;
- quality gates tradicionais (regra de cobertura minima);
- quality gates baseados em IA;
- analise automatizada de observabilidade (logs, metricas e traces);
- abertura automatica de issues no GitHub quando problemas criticos sao detectados.

A aplicacao contem modulos matematicos em dois contextos:

- `src_alta`: modulo principal com funcoes de soma e divisao;
- `src_baixa`: modulo com operacoes adicionais (soma, subtracao, multiplicacao, divisao, par/impar).

## Estrutura principal

- `.github/workflows/`: pipelines GitHub Actions
- `src_alta/` e `src_baixa/`: codigo-fonte
- `tests_alta/`, `tests_alta_ia_autorizado/`, `tests_baixa/`: suites de teste
- `logs/`: amostra de log para analise por IA
- `metrics/`: amostras de metricas aprovadas/reprovadas
- `traces/`: amostra de trace distribuido
- `coverage/`: relatorios de cobertura gerados pelos testes

## Descricao dos pipelines

Todos os workflows estao com gatilho manual (`workflow_dispatch`).

### 1) Cobertura tradicional

- **Cobertura Alta** (`.github/workflows/cobertura-alta.yml`)
  - Executa `npm install` e `npm test`.
  - Usa `coverage/coverage-summary.json` para ler cobertura total.
  - Reprova se cobertura de linhas for menor que 80%.

- **Cobertura Baixa** (`.github/workflows/cobertura-baixa.yml`)
  - Executa apenas testes de `tests_baixa` com cobertura de `src_baixa`.
  - Reprova se cobertura de linhas for menor que 80%.

### 2) Quality Gate com IA (codigo)

- **Quality Gate com IA** (`.github/workflows/quality-gate-ia.yml`)
  - Coleta cobertura de `tests_baixa`/`src_baixa`.
  - Envia percentual para a API da OpenAI (`gpt-4o-mini`).
  - IA responde se deve APROVAR ou BLOQUEAR o avanco.

- **Quality Gate com IA (GroqCloud) - Autorizado** (`.github/workflows/quality-gate-ia-groq-autorizado.yml`)
  - Coleta cobertura de `tests_alta_ia_autorizado`/`src_alta`.
  - Consulta IA via GroqCloud (`llama-3.1-8b-instant`).
  - Reprova se a IA retornar BLOQUEADO.

- **Quality Gate com IA (GroqCloud) - Autorizado + Cobertura 80%** (`.github/workflows/quality-gate-ia-groq-autorizado-cobertura-80.yml`)
  - Mesmo fluxo do pipeline acima, mas com bloqueio adicional: cobertura < 80% reprova automaticamente.

### 3) Analise de observabilidade com IA

- **IA analisando logs** (`.github/workflows/log-analysis.yml`)
  - Le `logs/app.log`.
  - IA identifica se existe erro critico.
  - Se houver, cria issue automaticamente e falha o pipeline.

- **IA analisando metricas - aprovado pela IA** (`.github/workflows/metrics-analysis-aprovado.yml`)
  - Le `metrics/system-aprovado.json`.
  - Solicita resposta estruturada (JSON) com status APROVADO/REPROVADO.
  - Se REPROVADO, cria issue e falha.

- **IA analisando metricas - reprovado pela IA** (`.github/workflows/metrics-analysis-reprovado.yml`)
  - Mesmo processo, lendo `metrics/system-reprovado.json`.
  - Fluxo preparado para exercitar cenario de reprovacao.

- **IA analisando traces** (`.github/workflows/trace-analysis.yml`)
  - Le `traces/payment_trace.txt`.
  - IA analisa gargalos e riscos de timeout/degradacao.
  - Se detectar termos criticos, cria issue e falha o pipeline.

## Exemplos de execucao

### Execucao local

Instalar dependencias:

```bash
npm install
```

Rodar todos os testes com cobertura:

```bash
npm test
```

Rodar apenas testes da parte baixa com cobertura:

```bash
npx jest tests_baixa --coverage --collectCoverageFrom="src_baixa/**/*.ts" --coverageReporters=text --coverageReporters=json-summary
```

Rodar apenas testes da parte alta autorizada com cobertura:

```bash
npx jest tests_alta_ia_autorizado --coverage --collectCoverageFrom="src_alta/**/*.ts" --coverageReporters=text --coverageReporters=json-summary
```

### Execucao dos pipelines no GitHub Actions

1. Acesse a aba **Actions** do repositorio.
2. Selecione o workflow desejado (ex.: `Cobertura Alta`, `IA analisando logs`, `IA analisando traces`).
3. Clique em **Run workflow**.

Opcionalmente, via GitHub CLI:

```bash
gh workflow run "Cobertura Alta"
gh workflow run "Quality Gate com IA"
gh workflow run "IA analisando logs"
gh workflow run "IA analisando traces"
```

## Segredos (GitHub Secrets)

Para executar todos os pipelines com IA, configure os secrets no repositorio:

- `OPENAI_API_KEY` (usado em `quality-gate-ia.yml`)
- `GROQCLOUD_API_KEY` (usado nos workflows com GroqCloud)
- `GITHUB_TOKEN` (ja disponibilizado pelo GitHub Actions para criar issues)

## Tecnologias utilizadas

- **Node.js 20** (ambiente dos pipelines)
- **TypeScript 5**
- **Jest + ts-jest** (testes e cobertura)
- **GitHub Actions** (CI/CD)
- **GitHub CLI (`gh`)** para automacao de issues
- **curl, jq, sed, grep, python3, node** em scripts shell dos workflows
- **OpenAI API** e **GroqCloud API** para quality gate e analises com IA

## Observacoes importantes

- O projeto foi estruturado para fins didaticos de DevOps/CI com IA.
- Os gatilhos dos pipelines sao manuais (`workflow_dispatch`) para facilitar demonstracoes em aula.
- A qualidade minima de cobertura de referencia nos quality gates tradicionais e de 80%.
