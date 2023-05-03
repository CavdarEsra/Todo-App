# TodoApp

> Angular ile yaptığım bu proje için öncelikle json-server kullarak fake api oluşturdum. Bunun için terminalde _"npm install -g json-server”_ komutunu çalıştırdım. “db.json” dosyası oluşturulup içine json veriler girdim. Terminalin birinde _“ng serve - o“_ ile projeyi çalıştırırken diğerinde ise API’ yi otomatik güncellemesi için _“json-server –watch db.json”_ komutunu kullandım.

> Oluşturduğum models klasöründe task ve category olmak üzere iki ts dosyası oluşturup modellerimi tanımladım. (Bu modellere uygun veri girilmesi sağlanarak eksik veya fazla veri girişi önlenebiliyor.)

> Service klasöründe tasks.service de _3000_ portumdan gelen verilerimin url ini tanımlayıp bu url üzerinden task ve category lerime ulaşarak _GET, POST, PUT, DELETE_ işlemleri yapan methodlar oluşturdum.

> Modal componentte , task ların listelendiği tablodaki edit butonuna tıklandığında açılacak olan modal ile ilgili kodlar yer alıyor. İstediğimiz bir veride güncellemeyi edit butonuna tıklayarak çıkan modal içindeki formdan yapabiliriz. Daha sonra modalın içinde yer alan ‘saveChange’ butonunu tıklayarak başarılı güncelleme yaptıysak olumlu mesaj , aksi durumda hata mesajı sweetAlert aracılığıyla ekranda gösterilir, modal kapanır ve tablodaki tasklar gücellenir.

![Markdown resim eklemek için](http://Screenshot_2.jpg)

> Task-list adında oluşturduğum component içinde ise geriye kalan birçok işlem gerçekleştirilir.

- Navbar kısmında bulunan ‘add task’ butonuna tıklayarak açılan modaldaki formu doldurarak yeni bir task oluştururuz. Edit kısmında olduğu gibi gerekn alert mesajı gösterilip modal kapatılır ve taskların son hali gösterilir.
- Search kısmında bulunan category ve priority selectlerinden ikisinden de seçim yapılarak tasklarda filtreleme yapılır.
- Tablo kısmında tasklar listelenir. Son sütununda yer alan edit ve delete butonlarıyla tıklanan task için gereken işlem yapılır ve tasklar tazelenir.

\*Edit ve add butonlarına tıklandığında açılan modallardaki formlarda validation kuralları da kullanılarak boş geçme önlendi, sweetAlert ile uyarı mesajları verildi.

[Markdown Youtube Linki](https://www.youtube.com/watch?v=k_v0cJjktuc "Markdownu öğrendiğim video")
