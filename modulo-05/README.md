# Módulo 05

## Git

### Aula 01
#### Tópicos abordados:
- O que é controle de versão?

```
Nomenclatura de controle de versão:
0.0.0 - alpha (disponível apenas para programadores)
0.0.0 - beta (disponível para usuários selecionados)
0.0.1 - beta (indica correção de bugs do sistema)
0.1.0 - beta (indica nova funcionalidade)
1.0.0 - comercial (disponível para todos os usuários)
1.0.1 - comercial (com resolução de bug)
2.0.0 - comercial (indica uma grande mudança, seja na interface ou estrutura física e normalmente incompatível com versões anteriores)
```
- Instalação do git
- Comandos iniciais no git
```git
# iniciar um novo repositório git
git init

# clonar um repositório remoto
git clone https://url_repositorio

# verificar o status dos arquivos
git status

# adicionar um arquivo específico na área de staged
git add nome_arquivo.txt

# adicionar todos os arquivos na área de staged
git add .

# remover arquivo da área de staged
git rm --cached nome_arquivo.txt

git restore --staged nome_arquivo.txt

# criar um commit
git commit -m'Sua mensagem de commit'

# criar nova branch
git checkout -b "nome-nova-branch"

# mudar entre branch
git checkout "nome-da-branch"

# fazer merge entre branch
git merge "nome-da-branch"

# deletar branch
git branch -d "nome-da-branch"

# enviar arquivos para repositório remoto
git push origin main

# atualizar repositório local com conteúdo do repositório remoto
git pull origin main
```
- Resolvendo conflitos no git
- Criação de repositórios no GitHub
- Conexão de repositório local com repositório remoto no GitHub
- Rotina de um projeto usando git