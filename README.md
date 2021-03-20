# Programmeerimine II 2021 kevad - Vabanduste API

## Endpoindid
### Kommentaarid:
* GET /comments
  * Tagastab kommentaaride nimekirja
* GET /comments/:id
  * Tagastab kommentaari määratud id-ga
* POST /comments
  * Loob uue kommentaari
  * Nõutud ecxuseId, createdById ja content request body-s
* DELETE /comments/:id
  * Kustutab määratud id-ga kommentaari
  ### Kasutajad:
* GET /users
  * Tagastab kasutajate nimekirja (pead olema 'Admin' rollis)
* GET /users/:id
  * Tagastab kasutaja määratud id-ga
* POST /users
  * Loob uue kasutaja
  * Nõutud firstName ja lastName request body-s
* PATCH /users/:id
  * Muudab määratud id-ga kasutaja
  * Nõutud id parameetrina
  * Nõutud firstName või lastName request body-s
* DELETE /users/:id
  * Kustutab määratud id-ga kasutaja
### Kategooriad:
* GET /categories
  * Tagastab kategooriate nimekirja
* GET /categories/:id
  * Tagastab kategooria määratud id-ga
* POST /categories
  * Loob uue kategooria
  * Nõutud description request body-s
* PATCH /categories/:id
  * Muudab määratud id-ga kategooria
  * Nõutud id parameetrina
  * Nõutud description request body-s
* DELETE /categories/:id
  * Kustutab määratud id-ga kategooria

### Vabandused:
* GET /excuses
  * Tagastab vabandusete nimekirja
  * Query parameeter categoryId=:id tagastab vabandused määratud kategooriaga
* GET /excuses/:id
  * Tagastab määratud id-ga vabanduse
* POST /excuses
  * Loob uue vabanduse
  * Nõutud description ja categoryId request body-s
* PATCH /excuses/:id
  * Muudab määratud id-ga vabanduse
  * Nõutud id parameetrina
  * Nõutud description või categoryId request body-s
* DELETE /excuses/:id
  * Kustutab määratud id-ga vabanduse
