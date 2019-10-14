# WebView

versions
Angular CLI  8.3.6.
Angular Material Design 8.2.3

## Link do projeto

Lá você pode navegar por toda aplicação (http://framework.fernando-developer.com)

## OBS
Integração com uma api fake (https://jsonplaceholder.typicode.com/)
API realiza reqeuests e respones utilizando todos os verbos, porém o dados não são consistidos no servidor, <br>
para validar se as mensagens de sucessos se estão corretas com os responses basta abrir o inspect do navegador.

## Servidor produção
Para que as rotas funcionem sem Internal Server Error<br>
Deve adicionar no mesmo nível do index.html .htaccess <br>
<pre>
  RewriteEngine on
  RewriteCond %{REQUEST_FILENAME} -s [OR]
  RewriteCond %{REQUEST_FILENAME} -l [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^.*$ - [NC,L]
  RewriteRule ^(.*) index.html [NC,L]
</pre>
