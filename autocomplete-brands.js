function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}

/*An array containing all the country names in the world:*/
var brands = ["A Day's March", 
"A Nordin", 
"A P C", 
"A Pair", 
"A-COLD-WALL", 
"A. Christensen", 
"Abbey Dawn", 
"Abercrombie Fitch", 
"Accessorize", 
"Acne Studios", 
"Addict", 
"ADER error", 
"Adidas", 
"Adieu", 
"Adnym Atelier", 
"ADOORE", 
"Adrianna Papell", 
"Adventure boots", 
"Aerosoles", 
"AFFIX", 
"After Eden", 
"Agatha ruiz de la prada", 
"Ahluwalia", 
"Aigle", 
"Aimé Leon Dore", 
"Airstep", 
"Airwalk", 
"Alaïa", 
"Alain Mikli", 
"Alan Crocetti", 
"Alan Paine", 
"Alberto guardiani", 
"Alberville", 
"Alessandrini", 
"Alexa Chung", 
"Alexander McQueen", 
"Alexander Wang", 
"Alife", 
"All Blues", 
"Allen Edmonds", 
"AllSaints", 
"Alpha Industries", 
"Altuzarra", 
"Amaort", 
"Ambre", 
"Ambre Babzoe", 
"Ambush", 
"American Apparel", 
"American Eagle Outfitters", 
"AMI", 
"AMIRI", 
"Ammann", 
"Amust", 
"Anatomic Co", 
"Anerkjendt", 
"Angel infantes", 
"Angulus", 
"Anine Bing", 
"Ann Demeulemeester", 
"Anna Field", 
"Anna Holtblad", 
"Anti Social Social Club", 
"Antony Morato", 
"Apepazza", 
"Apple", 
"Ara", 
"Arbesko", 
"Arc'Teryx", 
"Arcopedico", 
"Area forte", 
"Aries", 
"Arket", 
"Armani", 
"Art kids", 
"Ash", 
"Asics", 
"Asos", 
"Aspesi", 
"Astrid Andersen", 
"Atmosphere", 
"ATP", 
"Audley", 
"Australian luxe", 
"Axel Arigato", 
"Azzaro", 
"Azzezo", 
"B Store", 
"B.Young", 
"Babolat", 
"Baby Björn", 
"Babycham", 
"Babynest", 
"Back", 
"Badgley mischka", 
"Baffin", 
"Bagheera", 
"Baldessarini", 
"Balenciaga", 
"Ballerina closet", 
"Bally", 
"Balmain", 
"Banana Republic", 
"BAPE", 
"Barbie", 
"Barbour", 
"Barker", 
"BARRAGÁN", 
"Barund CPH", 
"Base London", 
"Batistini", 
"Batman", 
"Baum und Pferdgarten", 
"Bebe", 
"Becksöndergaard", 
"Belle by Sigerson Morrison", 
"Belmondo", 
"Belstaff", 
"Ben Sherman", 
"Benetton", 
"Bensimon", 
"Bergans of Norway", 
"Bergstein", 
"Bershka", 
"Bertoni", 
"Betsey Johnson", 
"Better Bodies", 
"Betty Blue", 
"Betula", 
"Bianca Chandôn", 
"Bianco", 
"Bik Bok", 
"Bikkembergs", 
"Billabong", 
"Billi Bi", 
"Billionaire Boys Club", 
"Birgitte Herskind", 
"Birkenstock", 
"Bisgaard", 
"Bitte Kai Rand", 
"Biviel", 
"Björn Borg", 
"Black Lily", 
"Black Secret", 
"Black Venus", 
"Blackstone", 
"Blauer", 
"Blend", 
"Blink", 
"Blk Dnm", 
"Bloch", 
"Blowfish", 
"Bluebella", 
"Blundstone", 
"Blåkläder", 
"Bläck", 
"Bobbie Burns", 
"Boblbee", 
"Bobux", 
"Bode", 
"Bodyflirt", 
"Boglioli", 
"Bogs", 
"Bondelid", 
"Boohoo", 
"Boomerang", 
"Boras", 
"Boris Bidjan Saberi", 
"Bosch", 
"Bottega Veneta", 
"Boxfresh", 
"Brako", 
"Brand Industries", 
"Brandit", 
"Braqeez", 
"Brave Soul", 
"Breitling", 
"Brioni", 
"British knights", 
"Brixton", 
"Bronx", 
"Brooks Brothers", 
"Brunngård", 
"Bruno Banani", 
"Bruno Magli", 
"Bruno Premi", 
"Bruun & Stengade", 
"Bruuns Bazaar", 
"Buffalo", 
"Bugatti", 
"Bullboxer", 
"Bulldozer", 
"Bundgaard", 
"Burberry", 
"Burton", 
"Buscemi", 
"Busnel", 
"Butterfly twists", 
"Bvlgari", 
"BXY", 
"By Burin", 
"By Malene Birger", 
"By Malina", 
"Byblos", 
"Byredo", 
"Båstad original", 
"C.P. Company", 
"C1rca", 
"Ca Shott", 
"Cafenoir", 
"Calida", 
"Calou", 
"Calvin Klein", 
"Camel", 
"Camilla Thulin", 
"Camper", 
"Campomaggi", 
"Canada Goose", 
"Canada Snow", 
"Candice Cooper", 
"Canon", 
"Cappelletti", 
"Caprice", 
"Carhartt", 
"Carin Wester", 
"Carriwell", 
"Cars", 
"Cartier", 
"Carvela", 
"Casablanca", 
"Casall", 
"Castaner", 
"Catarina Martins", 
"Caterpillar", 
"Cavalet", 
"Cayler & Sons", 
"CDLP", 
"Ceannis", 
"Cece L Amour", 
"Cecil", 
"CECILIE Copenhagen", 
"Celavi", 
"Céline", 
"Celio", 
"Cellbes", 
"Cellini", 
"Cerruti", 
"Chaco", 
"Champion", 
"Chanel", 
"Chanelle", 
"Charles David", 
"Charles Jeffrey Loverboy", 
"Cheap Monday", 
"Cheapo", 
"Chelsea Peers", 
"Chi Chi London", 
"Chie Mihara", 
"Chimi", 
"China girl", 
"Chinese laundry", 
"Chipie", 
"Chipmunks", 
"Chloé", 
"Chopard", 
"Christian Lacroix", 
"Christian Louboutin", 
"Christopher Kane", 
"Church’s", 
"Cinque", 
"Ciso", 
"Citybird", 
"Clae", 
"Clarks", 
"Claudie Pierlot", 
"Clip Rope", 
"Club L", 
"Club Monaco", 
"CMMN SWDN", 
"Coach", 
"Cobra golf", 
"Coccinelle", 
"Colmar", 
"Colors of California", 
"Colourful Rebel", 
"Columbia", 
"Comma", 
"Comme des Garçons", 
"Common Projects", 
"Conguitos", 
"Converse", 
"Coperni", 
"Coral blue", 
"Corniche By Trickers", 
"Cos", 
"Cotton On", 
"Courrèges", 
"Craft", 
"Craig Green", 
"Cream", 
"Creative recreation", 
"Crime", 
"Criminal Damage", 
"Crocker", 
"Crockett & Jones", 
"Crocs", 
"Cubus", 
"Culture", 
"Cushe", 
"Cutler & Gross", 
"Côte & Ciel", 
"D for Dasia", 
"D.A.T.E.", 
"Dada", 
"Dahlin", 
"Dala clogs", 
"Damir Doma", 
"Damn heels", 
"Dance", 
"Daniblack", 
"Daniel W. Fletcher", 
"Darkstone", 
"Day birger et mikkelsen", 
"DC Shoes", 
"Dea Kudibal", 
"Deadwood", 
"Debbie", 
"DeFacto", 
"Dekline", 
"Denim Hunter", 
"Depeche", 
"Desigual", 
"Dewalt", 
"Diadora", 
"Diane von Furstenberg", 
"Diavolina", 
"Dickies", 
"Dico Copenhagen", 
"Diddi", 
"Didriksons", 
"Diemme", 
"Diesel", 
"Diggers", 
"DinSko", 
"Dior", 
"Dirty Laundry", 
"Disney", 
"Dita", 
"Dixie", 
"DKNY", 
"Dkode", 
"Do-win", 
"Dockers", 
"Dockers by Gerli", 
"Docksta", 
"Dolce & Gabbana", 
"Dolly Do", 
"Dollybird", 
"Dolomite", 
"Don Donna", 
"Dondup", 
"Donna girl", 
"Dopie", 
"Dorina", 
"Dorothy Perkins", 
"Dr Martens", 
"Dr. Denim", 
"Dranella", 
"Draven", 
"Dreimaster", 
"Dressmann", 
"Dries van Noten", 
"Dry Lake", 
"Drykorn", 
"Dsquared2", 
"Duffy", 
"Dune", 
"Dunhill", 
"Däv", 
"Eagle", 
"Eastpak", 
"Ebbe", 
"Ecco", 
"Eckhaus Latta", 
"Ecko", 
"Ed Hardy", 
"Edwin", 
"Efva Attling", 
"Ek of Sweden", 
"Ekn", 
"El Naturalista", 
"Element", 
"Elie Saab", 
"Elisabetta Franchi", 
"Ellesse", 
"Ellos", 
"Elvine", 
"Elvio Zanon", 
"Em", 
"Emerica", 
"Emilio Pucci", 
"Emily van den Bergh", 
"Emma", 
"Emma go", 
"Emu Australia", 
"Energie", 
"Enfant", 
"Enfants Riches Déprimés", 
"Engineered Garments", 
"Envie de Fraise", 
"Envii", 
"Erdem", 
"Erfo", 
"Ermenegildo Zegna", 
"éS Footwear", 
"Escada", 
"Eser", 
"Eskimo", 
"Esprit", 
"Esska", 
"Etam", 
"Etienne Aigner", 
"Etki", 
"Etnies", 
"Eton", 
"Etro", 
"Ettore Adriano", 
"Études", 
"Even & Odd", 
"Everest", 
"Evisu", 
"Exani", 
"Exte", 
"Eytys", 
"Ezpz", 
"F-Troupe", 
"Fabi", 
"Fabiana", 
"Facetasm", 
"Faguo", 
"FALKE", 
"Fantasy", 
"Fashion by C", 
"Fashion Union", 
"Fear Of God", 
"Feiyue", 
"Fendi", 
"Fenty", 
"Festool", 
"Feud", 
"Fila", 
"Filippa K", 
"Fiona McGuinness", 
"Fiorelli", 
"Firetrap", 
"Fitflop", 
"Fiveunits", 
"Fjällräven", 
"Flash", 
"Flip Flop", 
"Fly London", 
"Flying Tiger", 
"Forever 21", 
"Forever New", 
"Fornarina", 
"Fossil", 
"Frame Denim", 
"Francesco Morichetti", 
"Frank Dandy", 
"Frank Wright", 
"Franklin & Marshall", 
"Fred Perry", 
"Free People", 
"Freeman T. Porter", 
"Freequent", 
"French Connection", 
"French Sole", 
"Fresas con Nata", 
"Friboo", 
"Friis Company", 
"Fruit of The Loom", 
"Frye", 
"Fubu", 
"Fuchs Schmitt", 
"Furla", 
"G-Star", 
"Gaastra", 
"Gabba", 
"Gabor", 
"Galaxy", 
"Game Boy", 
"Ganni", 
"Gant", 
"Gap", 
"Garden", 
"Gardenia", 
"Garmont", 
"Garvalin", 
"Gasp", 
"GCDS", 
"Geggamoja", 
"Gentle Monster", 
"Geox", 
"Gestuz", 
"Ghibi", 
"Giacomorelli", 
"Giesswein", 
"Gigli", 
"Gildan", 
"Gina Tricot", 
"Giuseppe Zanotti", 
"Givenchy", 
"Glagla", 
"Glamorous", 
"Glerups", 
"GmbH", 
"Gneis", 
"Gogos", 
"Gola", 
"Golden Goose", 
"Goliath", 
"Gosha Rubchinskiy", 
"Gourmet", 
"Goyard", 
"Gram", 
"Graninge", 
"Gravis", 
"Green Comfort", 
"Groundhog", 
"Guardiadi", 
"Gucci", 
"Gudrun Sjödén", 
"Guess", 
"Guidi", 
"Gul & Blå", 
"Gulliver", 
"Gunilla Ponten", 
"Gymshark", 
"H by Hudson", 
"H&M", 
"Hackenbusch", 
"Hackett", 
"Haglöfs", 
"Haider Ackermann", 
"Han Kjøbenhavn", 
"Happiness", 
"Happy Holly", 
"Happy Socks", 
"Hard Hearted Harlot", 
"Harley Davidson", 
"Havaianas", 
"Head", 
"Heelys", 
"HELIOT EMIL", 
"Hello Kitty", 
"Helly Hansen", 
"Helmut Lang", 
"Henri Lloyd", 
"Hermès", 
"Heron Preston", 
"Herschel", 
"Hip", 
"Hispanitas", 
"Hoka One One", 
"Hollies", 
"Hollister", 
"Hood By Air", 
"Hope", 
"Hoss", 
"Houdini", 
"House Of Dagmar", 
"House of Harlow 1960", 
"House of Lola", 
"House of Montague", 
"Hoya", 
"Hub", 
"Hub Footwear", 
"Hudson", 
"Hugo Boss", 
"Hummel", 
"Hunkemöller", 
"Hunky Dory", 
"Hunter", 
"Hush Puppies", 
"Husqvarna", 
"Hype", 
"IcanIwill", 
"Iceberg", 
"Icebug", 
"Ichi", 
"Ida Sjöstedt", 
"Ideal of Sweden", 
"Iittala", 
"Ilenia P", 
"Ilse Jacobsen", 
"Ilves", 
"Imsevimse", 
"Indiska", 
"Inov8", 
"Intrigo", 
"InWear", 
"Iron Fist", 
"Irregular Choice", 
"Isabel Marant", 
"Issey Miyake", 
"Ivory", 
"Ivyrevel", 
"J Lindeberg", 
"J.Crew", 
"J.W. Anderson", 
"Jack & Jones", 
"Jack and Lily", 
"Jack Wolfskin", 
"Jackal", 
"Jackpot", 
"Jacquemus", 
"Jaded London", 
"Jako", 
"Jalas", 
"Jana", 
"Jascha Stockholm", 
"JDY", 
"Jean Paul Gaultier", 
"Jeffrey Campbell", 
"Jenny by Ara", 
"Jessica Simpson", 
"Jet Set", 
"Jil Sander", 
"Jim Rickey", 
"Jimmy Choo", 
"JJ Footwear", 
"Jofama", 
"John Fluevog", 
"John Galliano", 
"John Spencer", 
"Johnny Bulls", 
"Johnston Murphy", 
"Joop!", 
"Jordan", 
"Josef Seibel", 
"Juicy Couture", 
"Julie Fagerholt", 
"Jumperfabriken", 
"Junk De Luxe", 
"Junya Watanabe", 
"Just Female", 
"Juun.J", 
"K Cobler", 
"K-Swiss", 
"K1X", 
"Kameleont", 
"Kamik", 
"Kangaroos", 
"Kanna", 
"Kaporal", 
"Kappa", 
"KappAhl", 
"Karen by Simonsen", 
"Karen Millen", 
"Karhu", 
"Kari Traa", 
"Karin Halvors", 
"Karl Kani", 
"Karl Lagerfeld", 
"Kat Von D", 
"Kate Spade", 
"Katvig", 
"Kavat", 
"Kawasaki", 
"Keds", 
"Keen", 
"Keep", 
"KENDALL + KYLIE", 
"Kennel Schmenger", 
"Kenneth Cole", 
"Kenzo", 
"KG by Kurt Geiger", 
"Khrio", 
"Kickers", 
"Kidboxer", 
"Kik Kid", 
"Kiko Kostadinov", 
"Killah", 
"Kimmik", 
"King", 
"Klättermusen", 
"Kmb", 
"KnowledgeCotton Apparel", 
"Kompis", 
"Konrad", 
"Kowalski", 
"Kriss Sweden", 
"Kron by Kron", 
"Kronstadt", 
"Ksubi", 
"KTZ", 
"Kurt Geiger", 
"KVD Los Angeles", 
"L A Gear", 
"L Homme Rouge", 
"L.A.M.B.", 
"La Chemise", 
"La Martina", 
"La Perla", 
"La Strada", 
"Lacoste", 
"Lacrosse", 
"Lady CG", 
"Lager 157", 
"Lakai", 
"Laksen", 
"Lancel Paris", 
"Lanvin", 
"Lascana", 
"Laura Biagiotti", 
"Laura by Heppo", 
"LauRie", 
"Lavoro", 
"Lazamani", 
"LdiR", 
"Le Chameau", 
"Le Coq Sportif", 
"Le Specs", 
"Lee", 
"Legend", 
"Legero", 
"Lego", 
"Leica", 
"Lemaire", 
"Lesson 2", 
"Levete Room", 
"Levi's", 
"Lexington", 
"Liam Hodges", 
"Libertine-Libertine", 
"Liebeskind Berlin", 
"Lily And Rose", 
"Linda Farrow", 
"Lindbergh", 
"Lindex", 
"Lipsy", 
"Lisa Larson", 
"Lise Lindvig", 
"Little Liffner", 
"Little Marcel", 
"Liu Jo", 
"Liverpool", 
"Living Kitzbühel", 
"Livly", 
"Lloyd", 
"Loake", 
"Lodi", 
"Loewe", 
"Loints of Holland", 
"Lola Ramona", 
"Lollipop", 
"Londain", 
"London Rebel", 
"Longchamp", 
"Lonsdale London", 
"Looking", 
"Loro Piana", 
"Lost Ink", 
"Lotto", 
"Louis Vuitton", 
"LTB", 
"Luca Bossi", 
"Ludwig Reiter", 
"Lundhags", 
"Lundmyr of Sweden", 
"Lupilu", 
"Luxury Rebel", 
"Lyle & Scott", 
"Läeder by Nature", 
"Maa", 
"Madewell", 
"Mads Nørgaard", 
"Magicfelt", 
"Magnanni", 
"Maians", 
"Maison Kitsuné", 
"Maison Martin Margiela", 
"Maje", 
"Maloles", 
"Mamalicious", 
"Mammut", 
"Manas", 
"Mango", 
"Mansur Gavriel", 
"Manufacture D Essai", 
"Marc", 
"Marc Cain", 
"Marc Ecko", 
"Marc Jacobs", 
"Marc O'Polo", 
"Marcelo Burlon", 
"Marco Bossi", 
"Marcus Martinus", 
"Marella", 
"Margaret Howell", 
"Marimekko", 
"Marina Ferranti", 
"Marine Serre", 
"Mario Valentino", 
"Marks & Spencer", 
"Marni", 
"Marques Almeida", 
"Marsèll", 
"Marta Jonsson", 
"Martine Ali", 
"Martine Rose", 
"Martinelli", 
"Mary Kay", 
"Masai", 
"Massimo Dutti", 
"Matinique", 
"Mavi", 
"Mavic", 
"Max Mara", 
"Mayla", 
"MbyM", 
"McKinley", 
"MCS", 
"Me&I", 
"Meadows", 
"Meindl", 
"Mel", 
"Mellow Yellow", 
"Melton", 
"Melvin Hamilton", 
"Menbur", 
"Mensfield", 
"Mentor", 
"Merchandise", 
"Merrell", 
"Mexicana", 
"Mexx", 
"Micha", 
"Michael Kors", 
"Mickey Club", 
"Miezko", 
"Millen", 
"Mina UK", 
"Mini for Many", 
"Mini Rodini", 
"Minimarket", 
"Minna Heino", 
"Minna Parikka", 
"Minnetonka", 
"Minnie Mouse", 
"Mirunz", 
"MISBHV", 
"Miss KG", 
"Miss P", 
"Miss Selfridge", 
"Miss Sixty", 
"Missguided", 
"Missoni", 
"Mister Tee", 
"Mitchell & Ness", 
"Miu Miu", 
"Mjus", 
"Mm6", 
"Mocklis", 
"Mod8", 
"Moda di Fausto", 
"Mohedatoffeln", 
"Mohino", 
"Molly Holly", 
"Molo", 
"Moma", 
"Momino", 
"Moncler", 
"Monitor", 
"Monki", 
"Monsoon", 
"Monster High", 
"Montblanc", 
"Montrail", 
"Moomin", 
"Moon Boot", 
"Moose Knuckles", 
"Morris", 
"MOS Copenhagen", 
"Mos Mosh", 
"Moschino", 
"Moss Copenhagen", 
"Mouli", 
"MQ", 
"MSGM", 
"MUCHACHOMALO", 
"Muckboot", 
"Muddus", 
"Mugler", 
"Mulberry", 
"Mumin", 
"Munthe plus Simonsen", 
"Mustang", 
"Musto", 
"Muubaa", 
"Mykita", 
"NA-KD", 
"NAF NAF", 
"Name It", 
"Nana", 
"Napapijri", 
"Native", 
"Naturino", 
"Navigator", 
"Needles", 
"Neil Barrett", 
"Nelly", 
"Neosens", 
"Nestor", 
"Network", 
"New Balance", 
"New Black", 
"New Era", 
"New Look", 
"New Rock", 
"New Zealand Boots", 
"Newbie", 
"Newhouse", 
"Next", 
"NG by Tero Palmroth", 
"Nike", 
"Nikolaj d'Étoiles", 
"Nikon", 
"Nine West", 
"Nintendo", 
"NN07", 
"Noa Noa", 
"Noah", 
"Nobrand", 
"Noë", 
"Noel", 
"Noisy May", 
"Nokia", 
"Nokian", 
"Nome", 
"Noodles", 
"Noppies", 
"Norrback", 
"North Sails", 
"Northwawe", 
"Notes du Nord", 
"Nova Star", 
"Novita", 
"Novita Man", 
"Nude", 
"Nudie", 
"Nueva Epoca", 
"Nunoo", 
"Nygårdsanna", 
"O", 
"O'Neill", 
"Oakley", 
"Oakwood", 
"OAS Company", 
"Oasis", 
"Obey", 
"Object", 
"Ocra", 
"Odd Molly", 
"Odeur", 
"ODLO", 
"Off-White", 
"Oill", 
"Olang", 
"Old Navy", 
"Old Soles", 
"Oliver Peoples", 
"Olsenhaus Pure Vegan", 
"Olymp", 
"Omega", 
"On", 
"One True Saxon", 
"Onemoment", 
"OnePiece", 
"Onetruesaxon", 
"Onitsuka Tiger", 
"Only", 
"Opus", 
"Original Penguin", 
"Orrefors", 
"Oscar Jacobson", 
"Osiris", 
"Ottolinger", 
"Our Legacy", 
"Oxygen", 
"Oysho", 
"Paco Gil", 
"Paco Mena", 
"Paco Rabanne", 
"Paez", 
"Pajar", 
"Pakros", 
"Palace", 
"Palladium", 
"Palm Angels", 
"Palomo Spain", 
"Panama Jack", 
"Pandora", 
"Pantofola d`Oro", 
"Papillio", 
"Paraboot", 
"Parajumpers", 
"paria /FARZANEH", 
"Paris Hilton", 
"Parisienne", 
"Park lane", 
"Park west", 
"Part Two", 
"Patagonia", 
"Pataugas", 
"Patrick", 
"Patrizia Pepe", 
"Paul & Friends", 
"Paul & Joe", 
"Paul Frank", 
"Paul Green", 
"Paul Shark", 
"Paul Smith", 
"Pavement", 
"Pax", 
"Peak Performance", 
"Pearl Izumi", 
"Pedag", 
"Pelle P", 
"Penelope", 
"Pepe Jeans", 
"Peperoni", 
"Pepino by Ricosta", 
"Peppercorn", 
"Perfect", 
"Pernilla Wahlgren", 
"Persol", 
"Pertti Palmroth", 
"Peter Kaiser", 
"Petit Bateau", 
"Philipp Plein", 
"Pieces", 
"Pier One", 
"Pierre Cardin", 
"Pikolinos", 
"Pilgrim", 
"Pimkie", 
"Pink", 
"Pinko", 
"Pinocchio", 
"Pippi Långstrump", 
"Playboy", 
"Playstation", 
"Plexx", 
"Po Zu", 
"Poetic", 
"Poetic Licence", 
"Pointer", 
"Polar Loop", 
"Polar Skate Co.", 
"Polarn O. Pyret", 
"Polaroid", 
"Polecat", 
"Pom D Api", 
"Pom Pom", 
"POMPdeLux", 
"Pony", 
"Prada", 
"Prêt à Porter", 
"Pretty Ballerinas", 
"Primark", 
"Primeboots", 
"Primigi", 
"Primo Piano", 
"Principe di Bologna", 
"Pring", 
"Pringle of Scotland", 
"Proenza Schouler", 
"Progetto", 
"Prokeds", 
"Pull & Bear", 
"PULZ", 
"Puma", 
"Puma by Alexander McQueen", 
"Pura Lopez", 
"Pyer Moss", 
"Qasimi", 
"Quay", 
"Quick", 
"Quiksilver", 
"Rabalder", 
"Race Marine", 
"Radii", 
"Raf Simons", 
"Rag & Bone", 
"Rains", 
"Ralph Boston", 
"Ralph Lauren", 
"Rap", 
"Ras", 
"Ray-Ban", 
"Rebecca Minkoff", 
"Redfoot", 
"Redwing", 
"Reebok", 
"Reef", 
"Refined by Bobbie Burns", 
"Rehab", 
"Reima", 
"Reiss", 
"Repeat", 
"Replay", 
"Reserved", 
"Resteröds", 
"RETROSUPERFUTURE", 
"Rhude", 
"Rice", 
"Rick Owens", 
"Ricosta", 
"Rieker", 
"Rimowa", 
"Rip Curl", 
"River Island", 
"Rivieras", 
"Rizzo", 
"RM Williams", 
"Roberto Botella", 
"Roberto Cavalli", 
"Robustor", 
"Rocco P", 
"Rock and Blue", 
"Rockabilly", 
"Rocket Dog", 
"Rockport", 
"Rodebjer", 
"Rohde", 
"Rokin", 
"Rolex", 
"Rolling Stones", 
"Rombaut", 
"Romika", 
"Roobin's", 
"Rose & Born", 
"Rosemunde", 
"Rosner", 
"Roxy", 
"Royal RepubliQ", 
"Rubber Duck", 
"Ruby Brown", 
"Rugged Eagle footwear", 
"Rugged Gear", 
"Rules by Mary", 
"Rut & Circle", 
"Ruthie Davis", 
"Röhnisch", 
"Rörstrand", 
"S. Oliver", 
"SAAB", 
"Sacai", 
"Sail Racing", 
"Saint Tropez", 
"Saint Vacant", 
"Salamander", 
"Salming", 
"Salomon", 
"Salvatore Ferragamo", 
"Sam Edelman", 
"Samsonite", 
"Samsung", 
"Samsøe & Samsøe", 
"Sancho Boots", 
"Sand", 
"Sanders", 
"Sandqvist", 
"Sandro Paris", 
"Sanita Clogs", 
"Sanita Workwear", 
"Sanuk", 
"Saucony", 
"Sbar", 
"Sbu", 
"Scarpa", 
"Schmoove", 
"Scholl", 
"Schott", 
"Scorett", 
"Scotch & Soda", 
"Sebago", 
"Sebastian", 
"Séfr", 
"Seidensticker", 
"Selected", 
"Senator", 
"Senso", 
"Séraphine", 
"Sergio Tacchini", 
"Shabbies Amsterdam", 
"Shabby Chic", 
"Shake it up", 
"Shepherd", 
"Shimano", 
"Shoe Biz", 
"Shoe Biz by Gardenia", 
"Shoe shi bar", 
"Shoe the Bear", 
"Sies Marjan", 
"Sievi", 
"Simone Rocha", 
"Simple", 
"Sioux", 
"Sisley", 
"Sisters Point", 
"Sixth June", 
"Sixtyseven", 
"Skechers", 
"Skin by Finsk", 
"Skofabriken Stockholm", 
"Sköna Marie", 
"Sloggi", 
"Sneaky Steve", 
"Snipe", 
"Soaked In Luxury", 
"SOC", 
"Sofie Schnoor", 
"Soft Comfort", 
"Soft Goat", 
"Soft Rebels", 
"Softinos", 
"Sole", 
"Solid", 
"Sonia Rykiel", 
"Sony", 
"Sorel", 
"Soulland", 
"Soulmate", 
"Soxo", 
"Soyaconcept", 
"Spalwart", 
"Spanx", 
"Speedo", 
"Sperry Top-Sider", 
"Spiderman", 
"Spm", 
"Springfield", 
"SSS World Corp", 
"Stampd", 
"Star Trek", 
"Star Wars", 
"Stau", 
"Steffen Schraut", 
"Stella McCartney", 
"Stella Nova", 
"Stenk", 
"Stenströms", 
"Steptronic", 
"Steve Madden", 
"Sthlm DG", 
"Stig Lindberg", 
"STOCKH LM", 
"Stone Island", 
"Stork Steps", 
"Stradivarius", 
"Strawberry Shortcake", 
"Street One", 
"Strellson", 
"STRONGER", 
"Ströms", 
"Stutterheim", 
"Stylein", 
"Stylesnob", 
"Stüssy", 
"Suecomma Bonnie", 
"Sugarfree shoes", 
"Sun Buddies", 
"Sunnei", 
"Superdry", 
"Superfit", 
"Superga", 
"Supertrash", 
"Supra", 
"Supreme", 
"Supremebeing", 
"Svea", 
"Svenskt Tenn", 
"Swear London", 
"Swedish Hasbeens", 
"Sweeks", 
"Swims", 
"Swissies", 
"T.U.K.", 
"Tamaris", 
"Targus", 
"Tatoosh", 
"Tbs", 
"Techno", 
"Tecnica", 
"Ted Baker", 
"Teddykompaniet", 
"Telfar", 
"Tellus", 
"Ten Points", 
"Tenson", 
"Terra Plana", 
"Tessa Mimmi Clogs", 
"Testbrand", 
"Teva", 
"Tezenis", 
"TFNC London", 
"The Kooples", 
"The North Face", 
"The Row", 
"The Seller", 
"The Urban Project", 
"Theresia M.", 
"These Glory Days", 
"Thierry Lasry", 
"Think", 
"Thinsulate", 
"Thom Brovne", 
"Thomas Sabo", 
"Thrasher", 
"Tiamo", 
"Tiger", 
"Tiger of Sweden", 
"Tigha", 
"Timberland", 
"Tissot", 
"Tiziana", 
"TNY", 
"Tom Ford", 
"Tom Joule", 
"Tom Tailor", 
"Tommy Hilfiger", 
"Toms", 
"Tony Mora", 
"Tony Perotti", 
"Topman", 
"Topshop", 
"Tory Burch", 
"Tosca Blu", 
"Totême", 
"Tous", 
"Toy Story", 
"Treksta", 
"Trendyol", 
"TRÉS BIEN", 
"Tretorn", 
"Triangl", 
"Triwa", 
"True Religion", 
"Trussardi", 
"Tsubo", 
"Twin Set", 
"Twist & Tango", 
"U.S. Polo Assn.", 
"U.S. Star", 
"Ugg", 
"Ukala", 
"Ulla Popken", 
"Ulle", 
"Umbro", 
"Under Armour", 
"Undercover", 
"Underground", 
"Underground England", 
"Uniforms for the Dedicated", 
"Uniqlo", 
"Unisa", 
"United Colors of Benetton", 
"United Nude", 
"Uno", 
"Unstiched Utilities", 
"Urban Outfitters", 
"V Ave Shoe Repair", 
"Vagabond", 
"Vailent", 
"Valentino", 
"Valerie", 
"Valontano", 
"Valsport", 
"Van Gils", 
"Van Laack", 
"Vans", 
"Velour", 
"Venettini", 
"Venice", 
"Vero Moda", 
"Versace", 
"Versace 19.69", 
"Vetements", 
"Via vai", 
"Vibram", 
"Victoria", 
"Victoria’s Secret", 
"Viking", 
"Viktor&Rolf", 
"Vila", 
"Villervalla", 
"Vince Camuto", 
"Vincent", 
"Vision", 
"Visvim", 
"Vithings Pulse", 
"Vivienne Westwood", 
"Vivobarefoot", 
"Vlado", 
"Volcom", 
"Volvo", 
"Voly", 
"Vood Vood", 
"Vt collection", 
"Wallis", 
"Walter Van Beirendonck", 
"Wandelei", 
"Warp", 
"Warrior", 
"Weekday", 
"Wera", 
"Werner", 
"Werner Kern", 
"Wesc", 
"Whistles", 
"White Mountaineering", 
"Why Not", 
"Whyred", 
"Wiges", 
"Wildflower", 
"Williot", 
"Wilson", 
"Winnie the Pooh", 
"Wolsey", 
"Wolverine", 
"Won Hundred", 
"Wonderbra", 
"Wonders", 
"Wood Wood", 
"Woolrich", 
"World Industries", 
"Wrangler", 
"Xenon", 
"Xti", 
"Xti Kids", 
"Y-3", 
"Y/Project", 
"Yamaha", 
"Yang Li", 
"YAS", 
"Yeezy", 
"Yellow Cab", 
"YKX", 
"Yohji Yamamoto", 
"Yourturn", 
"Yves Saint Laurent", 
"Zadig & Voltaire", 
"Zara", 
"Zay", 
"Zdar", 
"Zeus", 
"Zign", 
"Zizzi", 
"Zoggs", 
"Zoo York", 
"Zunblock", 
"Åhléns", 
"& Other Stories", 
"032c", 
"1017 ALYX 9SM", 
"1to3", 
"2XU", 
"3.1 Philip Lim", 
"7 For All Mankind"];

/*initiate the autocomplete function on the "myInput" element, and pass along the brands array as possible autocomplete values:*/
autocomplete(document.getElementById("itemBrand"), brands);