const sequelize = require("./db");
const Videos = require("../models/videos");
const Movies = require("../models/movies");
const Genre = require("../models/genre");
const Person = require("../models/person");
const Slider = require("../models/slider");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const Comments = require("../models/comments");
const Watchlist = require("../models/watchlist");
const slugField = require("../helpers/slugfield");
const Role = require("../models/role");




async function dummydata(){
    const moviecount = await Movies.count()
    if (moviecount == 0) {
        try {
        

        await Genre.bulkCreate([
            {
                name: "Aksiyon"
            },
            {
                name: "Bilim-Kurgu"
            },
            {
                name: "Macera"
            },
            {
                name: "Tarih"
            },
            {
                name: "Komedi"
            }
        ]);

        const watchlists = await Watchlist.bulkCreate([
            {
                name: "watchlist1"
            }
        ])

        const movies = await Movies.bulkCreate([
            {
                title: "Jumanji: The Next Level",
                url: slugField("Jumanji: The Next Level"),
                description: "İlk maceralarında tehlikeli yollardan başarıyla geçen dört genç, bu kez arkadaşlarını kurtarmak için tekrar oyuna dalmak zorunda kalacaktır. Üniversite çağındaki dört arkadaşın okulları tatile girmiş ve evlerine geri dönmüşlerdir. Yaşları büyüdükçe hayatlarına yeni bir yol çizmek zorunda kalan dört gençten Spencer, arkadaşlarının tehlikeye düşmesi ile tekrar Jumanji dünyasına girerek yeni bir maceraya atılır.",
                image: "m1.jpg",
                background: "cover3.jpg",
                language: "English",
                budget: 1000000, 
                is_home: true, 
                date: 2019,
                GenreId: 1
            },
            {
                title: "Free Guy",
                url: slugField("Free Guy"),
                description: "Guy, bir oyunun içinde basit bir göreve sahip sıradan bir karakterdir ve hayatı günün her saati rutin bir şekilde ilerlemektedir. Günlük görevini tamamlayıp memur gibi çalışan genç adam, Free City adlı acımasız bir açık dünya oyununda arka plan karakterlerinden biri olduğunu anlar ve onun için macera başlar…",
                image: "m3.jpg",
                background: "freeguy.jpg",
                language: "English",
                budget: 900000,
                is_home: true,
                date: 2021,
                GenreId: 3
            },
            {
                title: "Jurassic World",
                url: slugField("Jurassic World"),
                description: "Colin Trevorrow’un tekrardan yönetmen koltuğuna geçtiği serinin yeni filminde, ikinci filmin sonunda hapis hayatı yaşadıkları yerden kurtularak dünyaya yayılmayı başaran dinozorları ve onlarla bir arada yaşayan insanları görüyoruz…",
                image: "jurassic.jpg",
                background: "jurassic2.jpg",
                language: "English",
                budget: 15000000,
                is_home: true,
                date: 2022,
                GenreId: 2
            },
            {
                title: "Meg 2: The Trench",
                url: slugField("Meg 2: The Trench"),
                description: "Meg 2: Çukur, bir araştırma ekibinin devasa Meg’lere ve acımasız çevre yağmacılarına karşı verdiği mücadeleyi anlatıyor. Ekibin görevleri, kötü niyetli bir maden operasyonu nedeniyle tehdit altındadır ve zorluklarla dolu bir yolculuğa çıkarlar. Hayatta kalmak için yüksek riskli bir savaşa girerler ve zamana karşı bir yarışta, zekalarını kullanarak acımasız yırtıcıları alt etmeye ve geride bırakmaya çalışırlar.",
                image: "meg2.jpg",
                background: "meg.jpg",
                language: "English",
                budget: 245000000,
                is_home: true,
                date: 2023,
                GenreId: 2
            },
            {
                title: "Yıldızlararası",
                url: slugField("Yıldızlararası"),
                description: "Dünya üzerindeki yaşamın sona erdiği bir dönemde, bir grup araştırmacı insanlık tarihinin en önemli görevini üstlenir. Galaksimizin ötesine seyahat ederek, insanlığın yıldızların ötesinde yaşamını sürdürüp sürdüremeyeceğini keşfetmek amacıyla yola çıkarlar. Teknik bilgisi ve becerileriyle tanınan Cooper, mısır tarlalarında çiftçilik yaparak geçimini sağlamaktadır. Hayattaki tek amacı, iki çocuğuna güvenli bir gelecek sunmaktır. Onlarla birlikte yaşayan dede Donald, çocuklara göz kulak olurken, henüz 10 yaşındaki kızı Murph da şaşırtıcı bir zekaya sahiptir. Cooper, geçmişte bıraktığı bilim insanı kariyerini özlemektedir. Bir gün beklenmedik bir teklif alır ve ailesinin, hatta insanlığın geleceği için zorlu bir karar vermesi gerekmektedir",
                image: "interstaller.jpg",
                background: "interstaller2.jpg",
                language: "English",
                budget: 305000000,
                is_home: false,
                date: 2014,
                GenreId: 2
            },
            {
                title: "Oppenheimer",
                url: slugField("Oppenheimer"),
                description: "Film, II. Dünya Savaşı sırasında nükleer silah üretmek amacıyla başlatılan Manhattan Projesi kapsamında, Los Alamos Laboratuvarı'nın direktörü olan teorik fizikçi J. Robert Oppenheimer'a odaklanıyor. Julius Robert Oppenheimer'ın, atom bombasının geliştirilme sürecindeki rolü gözler önüne seriliyor.",
                image: "oppenheimer.jpg",
                background: "oppenheimer2.jpeg",
                language: "English",
                budget: 10000000, 
                is_home: false, 
                date: 2023,
                GenreId: 4
            },
            {
                title: "Baywatch",
                url: slugField("Baywatch"),
                description: "Mitch Buchannon, işine adamış, cesur ve sorumluluk sahibi bir cankurtarandır. Onun en öncelikli amacı, sorumlu olduğu koyu korumaktır. Ekip üyeleriyle uyumlu bir çalışma ilişkisi vardır ve birlikte görevlerini mükemmel bir şekilde yerine getirirler. Ancak bir gün, küstah bir yeni ekip üyesi ekibe katılır ve Mitch'in sinirlerini oldukça zorlar. Bununla birlikte, koyu tehdit eden bir suç planı ortaya çıktığında, ikili aralarındaki çekişmeyi bir kenara bırakıp birlikte çalışmak zorunda kalır.",
                image: "sahil.jpg",
                background: "baywatch.jpeg",
                language: "English",
                budget: 10000000, 
                is_home: false, 
                date: 2017,
                GenreId: 5
            },
            {
                title: "Hızlı ve Öfkeli 8",
                url: slugField("Hızlı ve Öfkeli 8"),
                description: "Hızlı ve Öfkeli 8, F. Gary Gray tarafından yönetilen bir yapım. Merakla beklenen filmde Chris Morgan tarafından kaleme alınan senaryo kullanıldı. Paul Walker olmadan devam eden seriye yeni isimler katılıyor. Vin Diesel, Michelle Rodriguez, Dwayne Johnson, Tyrese Gibson, Chris Bridges, Lucas Black, Scott Eastwood, Kurt Russell, Jason Statham gibi birçok ünlü isim sekizinci hikayede geri dönüyor. Bu sefer Charlize Theron ve Helen Mirren de kadroya dahil oluyor.Hikaye Küba'dan New York'a uzanıyor ve ekip normal bir hayata adım atmaya hazırlanıyor. Dom ve Letty balayılarını yaşarken, Brian ile Mia emekli olma kararı alıyor. Ancak gizemli bir kadın aniden ortaya çıkıyor ve her şeyi değiştiriyor. Dom'u baştan çıkararak suç dünyasına çekmeyi başarıyor. Arkadaşları ne olduğunu anlamadan kendilerini tekrar aksiyonun ortasında buluyorlar.",
                image: "fast.jpg",
                background: "fast2.jpeg",
                language: "English",
                budget: 15600000, 
                is_home: false, 
                date: 2017,
                GenreId: 1
            },
            {
                title: "6 Underground",
                url: slugField("6 underground"),
                description: "Adı çıkmış suçluların peşine düşerek dünyada kalıcı bir etki bırakmayı hedefleyen altı kişilik bir ekip, aksiyon dolu gerilim dolu bir filmde bir araya geliyor. Gizemli bir milyarderin liderliğinde, bu ekip zorlu görevlere imza atarken geçmiş yaşamlarını geride bırakmak için kendi ölümlerini sahneleyerek engelleri aşmak zorunda kalır.",
                image: "underground.jpg",
                background: "underground2.jpg",
                language: "English",
                budget: 80000000, 
                is_home: false, 
                date: 2019,
                GenreId: 1
            },
            {
                title: "San Andreas",
                url: slugField("San Andreas"),
                description: "San Andreas Fayı 2015 filmi merkez üssü California olan ve tüm Batı Kıyı Şeridi’ni etkileyen oldukça büyük ve şiddetli 9 şiddetindeki bir depremin hemen ardından arama kurtarma çalışmaları sırasında görev alan itfaiye eri Tom’un gözlem ve yaşadıklarını ele alırken, genç itfaiye erinin sorumlulukları ve duygusal hayatı arasındaki ikilemlerine de ayna tutuyor. Depremin duyulmasının hemen ardından boşanmak üzere eşiyle birlikte arama çalışmalara katılan bir pilot (Ray) ve bu sayede kızlarına ulaşma mücadelelerinin de ele alındığı San Andreas 2015 filmi kişilerin geçtikleri her yerde yaşadıkları aksiyonla birlikte en kötüsünü yaşadıklarını düşünmelerinin hemen ardından daha kötüsüne doğru yaptıkları yolculukları da filmin merkezine alıyor. Film önemli aksiyon sahneleriyle dikkat çekerken sinema eleştirmenleri tarafından da mükemmel olmasa da ortalamanın üzerinde bir puan almayı başardı. Efekt ve görsel öğeleri bakımından da iyi bir görüntü veren San Andreas Fayı filmi son yıllarda yapılan felaket filmleri arasında ortalamanın üzerindeki oyuncu performansıyla da göz dolduruyor. Ayrıca başrol oyuncusu Ray’in sınırsız yetenekleri; sürat teknesi, helikopter ve araba gibi araçların hepsini kullanabilmesi, zorlu durumlarda karar verme özelliğiyle de birleşince ortaya bir süper kahraman tadında önemli bir başrol oyuncusunun çıkmasına neden oluyor. Film halen izlenmediyse mutlaka izlenmeli.",
                image: "sanandreas.jpg",
                background: "sanandreas2.jpg",
                language: "English",
                budget: 80000000, 
                is_home: false, 
                date: 2015,
                GenreId: 1
            },
        ]);
        
        await Videos.bulkCreate([
            {
                title: "Jumanji: Yeni Seviye Türkçe Altyazılı Son Fragman",
                url: "9DTXZgyxjYs",
                MovieId: 1
            },
            {
                title: "JUMANJI: THE NEXT LEVEL - Official Trailer (HD)",
                url: "rBxcF-r9Ibs",
                MovieId: 1
            },
            {
                title: "JUMANJI: THE NEXT LEVEL - Final Trailer (HD)",
                url: "F6QaLsw8EWY",
                MovieId: 1
            },
            {
                title: "Free Guy | Official Trailer | 20th Century Studios",
                url: "X2m-08cOAbc",
                MovieId: 2
            },
            {
                title: "Free Guy | Official Trailer",
                url: "JORN2hkXLyM",
                MovieId: 2
            },
            {
                title: "Jurassic World - Official Trailer (HD)",
                url: "RFinNxS5KN4",
                MovieId: 3
            },
            {
                title: "Jurassic World: Fallen Kingdom - Official Trailer [HD]",
                url: "vn9mMeWcgoM",
                MovieId: 3
            },
            {
                title: "Jurassic World Dominion - Official Trailer [HD]",
                url: "fb5ELWi-ekk",
                MovieId: 3
            },
            {
                title: "Meg 2: The Trench Trailer (2023)",
                url: "vnmLD8tZxro",
                MovieId: 4
            },
            {
                title: "Interstellar Official Teaser Trailer #1",
                url: "3WzHXI5HizQ",
                MovieId: 5
            },
            {
                title: "Interstellar – Trailer 4",
                url: "LY19rHKAaAg",
                MovieId: 5
            },
            {
                title: "OPPENHEIMER - New Hindi Trailer",
                url: "SdHe-JseJfQ",
                MovieId: 6
            },
            {
                title: "Oppenheimer | New Trailer",
                url: "uYPbbksJxIg",
                MovieId: 6
            },
            {
                title: "Baywatch | Trailer",
                url: "qG1d_vaMplo",
                MovieId: 7
            },
            {
                title: "Baywatch (2017) - Official Trailer ",
                url: "eyKOgnaf0BU",
                MovieId: 7
            },
            {
                title: "HIZLI VE ÖFKELİ 8",
                url: "Q6yPhFccGQE",
                MovieId: 8
            },
            {
                title: "Fast & Furious 8 - Official Trailer 1",
                url: "uisBaTkQAEs",
                MovieId: 8
            },
            {
                title: "Fast & Furious 8 - Official Trailer 2",
                url: "NxhEZG0k9_w",
                MovieId: 8
            },
            {
                title: "6 Underground starring Ryan Reynolds | Official Trailer ",
                url: "YLE85olJjp8",
                MovieId: 9
            },
            {
                title: "Final Trailer | 6 Underground starring Ryan Reynolds | Netflix",
                url: "XcIuFTrLS6g",
                MovieId: 9
            },
            {
                title: "San Andreas Official Trailer #1 (2015) - Dwayne Johnson Movie HD",
                url: "yftHosO0eUo",
                MovieId: 9
            },
            {
                title: "San Andreas - Official Trailer 2 [HD]",
                url: "23VflsU3kZE",
                MovieId: 9
            },
        ]);

        await Slider.bulkCreate([
            {
                name: "slider1",
                image: "slider2.jpg",
                MovieId: 1
            },
            {
                name: "slider2",
                image: "slider1.jpg",
                MovieId: 2
            },
            {
               name: "slider3",
               image: "slider3.jpg",
               MovieId: 3
            }
        ]);

        const persons = await Person.bulkCreate([
            {
                name: "Dwayne Johnson",
                url: slugField("Dwayne Johnson"),
                biography: "Dwayne Douglas Johnson, Amerikalı aktör, iş insanı ve The Rock ring adıyla bilinen eski profesyonel güreşçidir. Geniş çapta tüm zamanların en büyük ve en etkili profesyonel güreşçilerinden biri olarak kabul edilen Johnson, güreş kariyeri boyunca 1990'ların sonunda ve 2000'lerin başında bir endüstri patlaması olan Attitude Era sırasında WWE'nin gelişiminin ve başarısının ayrılmaz bir parçasıydı. Johnson'ın filmleri Kuzey Amerika'da 3,5 milyar doların üzerinde ve dünya çapında 10,5 milyar doların üzerinde hasılat elde etti ve bu, kendisini dünyanın en çok hasılat yapan ve kazanan aktörlerinden biri yaptı.",
                image:"p5.jpg",
                birthday: 1972,
                city:"ABD",
                gender: "Erkek",
                duty_types: "Oyuncu"
            },
            {
                name: "Ryan Reynolds",
                url: slugField("Ryan Reynolds"),
                biography: "Ryan Rodney Reynolds, Kanadalı dizi ve sinema oyuncusudur. Ünlü aktris Scarlett Johansson'la 2008 yılından beri evliydi ancak Ocak 2011'de boşandılar. Aktörün üç erkek kardeşi vardır bunların ikisi polistir. Ryan Reynolds, kardeşleri arasında en küçük olandır",
                image: "ryan.jpg",
                birthday: 1976,
                city: "Kanada",
                gender: "Erkek",
                duty_types: "Oyuncu"
            },
            {
                name: "Chris Pratt",
                url: slugField("Chris Pratt"),
                biography: "Christopher Michael Chris Pratt Daha çok televizyon dizileri Parks and Recreation’daki Andy Dwyer ve Everwood’daki Harold Brighton Bright Abbott rolleriyle bilinen Amerikalı dizi ve sinema oyuncusudur. Moneyball, Zero Dark Thirty, The Five-Year Engagement ve Delivery Man gibi sinema filmlerinde de rol almıştır.",
                image: "chris.jpg",
                birthday: 1979,
                city: "ABD",
                gender: "Erkek",
                duty_types: "Oyuncu"
            },
            {
                name: "Jason Statham",
                url: slugField("Jason Statham"),
                biography: "Jason Statham, İngiliz aksiyon, dövüş filmi oyuncusu ve atlama dalında dereceleri olan eski bir yüzücüdür. Daima kendi sahne dövüşünü ve hünerlerini sergiler. Kendi antikahramanlığı ile ünlenmiştir ve filmlerinde genellikle İngiliz aksanı ile konuşur.",
                image: "p4.jpg",
                birthday: 1967,
                city: "İngiltere",
                gender: "Erkek",
                duty_types: "Oyuncu"
            },
            {
                name: "Jake Kasdan",
                url: slugField("Jake Kasdan"),
                biography: "Jake Kasdan, Amerikalı dizi ve film yönetmeni, oyuncu.",
                image: "jake.jpg",
                birthday: 1974,
                city: "ABD",
                gender: "Erkek",
                duty_types: "Yönetmen"
            },
            {
                name: "Christopher Nolan",
                url: slugField("Christopher Nolan"),
                biography: "Sir Christopher Edward Nolan CBE , İngiliz film yönetmeni, senarist, yapımcı, görüntü yönetmeni ve editördür.[1][2] Yönettiği filmler dünya çapında 6 milyar dolardan fazla hasılat elde etmiştir. Ayrıca 36 Oscar adaylığı ve 10 ödülü vardır. Oppenheimer filmiyle Altın Küre En İyi Yönetmen Ödülü'nü kazanmıştır.",
                image: "christopher.jpg",
                birthday: 1970,
                city: "Londra",
                gender: "Erkek",
                duty_types: "Yönetmen"
            },
            {
                name: "Jessica Chastain",
                url: slugField("Jessica Chastain"),
                biography: "Jessica Michelle Chastain, Amerikalı oyuncu ve film yapımcısıdır. Özellikle feminist temalı filmlerde rol almasıyla tanınan Chastain, Akademi Ödülü ve Altın Küre Ödülü de dahil olmak üzere çeşitli ödüller almıştır. Time dergisi onu 2012 yılında dünyanın en etkili 100 kişisinden biri olarak seçmiştir.",
                image: "jessica.jpeg",
                birthday: 1977,
                city: "ABD",
                gender: "Kadın",
                duty_types: "Oyuncu"
            },
            {
                name: "Shawn Levy",
                url: slugField("Shawn Levy"),
                biography: "Shawn Levy Kanadalı film yönetmeni ve aktör. Levy Big Fat Liar, Just Married, Cheaper by the Dozen, The Pink Panther ve Night at the Museum filmlerinin yönetmenliğini yapmıştır. Aralarında Pepper Dennis'in de olduğu bazı televizyon yapımlarını da yönetmiştir. Levy 20th Century Fox şirketi ile anlaşmalıdır",
                image: "shawn.jpg",
                birthday: 1968,
                city: "Kanada",
                gender: "Erkek",
                duty_types: "Yönetmen"
            },
            {
                name: "Colin Trevorrow",
                url: slugField("Colin Trevorrow"),
                biography: "Colin Trevorrow Amerikalı bir film yönetmeni, yapımcı ve senaristtir. İlk uzun metrajlı yönetmenlik denemesini bilim kurgu komedisi Safety Not Garantili ile yaparak hem eleştirel hem de ticari başarı elde etti",
                image: "colin.jpg",
                birthday: 1976,
                city: "ABD",
                gender: "Erkek",
                duty_types: "Yönetmen"
            },
            {
                name: "Ben Wheatley",
                url: slugField("Ben Wheatley"),
                biography: "Ben Wheatley, İngiliz yönetmen. Çeşitli sinema filmlerinde, televizyon komedilerinde ve dizilerde yönetmenlik yapmıştır",
                image: "ben.jpg",
                birthday: 1972,
                city: "ABD",
                gender: "Erkek",
                duty_types: "Yönetmen"
            },
            {
                name: "Cillian Murphy",
                url: slugField("Cillian Murphy"),
                biography: "Cillian Murphy (d. 25 Mayıs 1976) İrlandalı oyuncu. Oppenheimer'daki başrolüyle Oscar, Altın Küre ve BAFTA ödülü kazandı.Annesi Fransızca öğretmeni, babası müfettiştir. 1996 yılında Cork’ta hukuk eğitimi almaya başlamış ancak bir yıl okuduktan sonra başarısız olduğunu düşünüp oyunculuğa yönelme kararı vermiştir. Kendisine asıl ün kazandıran, Breakfast on Pluto filminde cinsel kimliği konusunda sorun yaşayan homoseksüel bir bireyi canlandırmasıdır. 2006'da Ken Loach'ın filminde Altın Palmiye kazanmıştır. Christopher Nolan'ın gözde oyuncularındandır.[1] Nolan'ın 6 filminde oynamıştır. 2017 yılında Çek direnişçi Jozef Gabcik'i canlandırmıştır.",
                image: "cillian.jpg",
                birthday: 1976,
                city: "ABD",
                gender: "Erkek",
                duty_types: "Oyuncu"
            },
            {
                name: "Alexandra Daddario",
                url: slugField("Alexandra Daddario"),
                biography: "Amerikalı oyuncudur. Avukat bir ailenin çocuğudur. Oyunculuk kariyerine 16 yaşında All My Children dizisinde Laurie Lewis karakteriyle başlamış, 2010 yılında Percy Jackson & the Olympians: The Lightning Thief filmindeki Annabeth Chase rolüyle dünyaca tanınan bir oyuncu olmuştur. Ayrıca Imagine Dragons adlı grubun Radioctive adlı klibinde rol almıştır",
                image: "p6.jpg",
                birthday: 1986,
                city: "ABD",
                gender: "Kadın",
                duty_types: "Oyuncu"
            },
            {
                name: "Seth Gordon",
                url: slugField("Seth Gordon"),
                biography: "Seth Gordon (15 Temmuz 1976 doğumlu) Amerikalı bir film yönetmeni, yapımcı, senarist ve film editörüdür. PBS , Bill & Melinda Gates Vakfı ve Birleşmiş Milletler Kalkınma Fonu için Personel% 1 dahil olmak üzere film ve televizyon için yapım ve yönetmenlik yaptı. Filmleri Sundance Film Festivali ve Slamdance Film Festivali",
                image: "seth.jpg",
                birthday: 1976,
                city: "ABD",
                gender: "Erkek",
                duty_types: "Yönetmen"
            },
            {
                name: "F. Gary Gary",
                url: slugField("F. Gary Gary"),
                biography: "Amerikalı film ve video klip yönetmeni ve yapımcı. Yönetmeni olduğu Cuma, Set It Off, Arabulucu ve İtalyan İşinin yeniden çevrimi ile tanınmaktadır. Filmlerin yanı sıra TLC, Dr. Dre, Tupac Shakur, Mary J. Blige, Outkast, Babyface ve Jay-Z gibi çok sayıda sanatçı ve grubun video kliplerinin yönetmenliğini üstlendi.",
                image: "gary.jpg",
                birthday: 1969,
                city: "ABD",
                gender: "Erkek",
                duty_types: "Yönetmen"
            },
            {
                name: "Michael Bay",
                url: slugField("Michael Bay"),
                biography: "Amerikalı film yönetmeni ve yapımcısıdır. Armageddon, The Rock, Pearl Harbor, Bad Boys, Bad Boys II, Transformers, Transformers: Yenilenlerin İntikamı gibi yüksek bütçeli aksiyon filmleri ile tanınır.",
                image: "michael.jpg",
                birthday: 1965,
                city: "ABD",
                gender: "Erkek",
                duty_types: "Yönetmen"
            },
            {
                name: "Brad Peyton",
                url: slugField("Brad Peyton"),
                biography: "Brad Peyton Kanadalı bir film yapımcısıdır ve en çok Dwayne Johnson'ın yıldız araçları Journey 2: The Mysterious Island, San Andreas ve Rampage'in yanı sıra Netflix dizisi Daybreak'i yönetmesiyle tanınır.",
                image: "brad.jpg",
                birthday: 1978,
                city: "Kanada",
                gender: "Erkek",
                duty_types: "Yönetmen"
            },
        ]);


        const users = await User.bulkCreate([
            {
                nickname: "admin",
                password: await bcrypt.hash("admin123",10),
                email: "admin@gmail.com",
                WatchlistId: 1
            }
        ]);

        const roles = await Role.bulkCreate([
            { name: "admin"},
            { name: "guest"}
        ]); 


        const comments = await Comments.bulkCreate([
            {
                message: "Çok iyi film",
                rating: 2,
                UserId: 1
            }
        ]);

        await users[0].addRole(roles[0]);

        await movies[0].addPerson(persons[0]);
        await movies[0].addPerson(persons[4]);
        await movies[1].addPerson(persons[1]);
        await movies[1].addPerson(persons[7]);
        await movies[2].addPerson(persons[2]);
        await movies[2].addPerson(persons[8]);
        await movies[3].addPerson(persons[3]);
        await movies[3].addPerson(persons[9]);
        await movies[4].addPerson(persons[5]);
        await movies[4].addPerson(persons[6]);
        await movies[5].addPerson(persons[10]);
        await movies[5].addPerson(persons[5]);
        await movies[6].addPerson(persons[0]);
        await movies[6].addPerson(persons[11]);
        await movies[6].addPerson(persons[12]);
        await movies[7].addPerson(persons[0]);
        await movies[7].addPerson(persons[3]);
        await movies[7].addPerson(persons[13]);
        await movies[8].addPerson(persons[1]);
        await movies[8].addPerson(persons[14]);
        await movies[9].addPerson(persons[0]);
        await movies[9].addPerson(persons[11]);
        await movies[9].addPerson(persons[15]);

        await movies[0].addComment(comments[0]);

        await users[0].addComment(comments[0]);
        
        } catch (error) {
            console.log(error);
        }
    }
};

module.exports = dummydata;