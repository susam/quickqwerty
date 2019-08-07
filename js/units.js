/*
The MIT License (MIT)

Copyright (c) 2008-2019 Susam Pal

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

'use strict'

var Units = {
    // 6-7 split (6 with left hand)
    'main': [
        // Unit 1
        {
            'title': 'asdf jkl;',

            'guide': '<p>' +
                     'All the eight fingers except the thumbs should ' +
                     'be placed on the home row. This is done by ' +
                     'placing the left forefinger on F and the right ' +
                     'forefinger on J. Place the remaining fingers on ' +
                     'the keys beside them in a natural manner. So, the ' +
                     'left little finger would be on A and the right ' +
                     'little finger would be on the ; (semicolon) key. ' +
                     '</p><p>' +
                     'To type any key, press the key with the finger over ' +
                     'it. Use one of the thumbs to press the space bar. ' +
                     'Keep your eyes on the screen as you type. Do not ' +
                     'look at the keyboard.' +
                     '</p><p>' +
                     'Proceed to the next lesson only when you can type ' +
                     'with 0% errors. Accuracy is more important than  ' +
                     'speed for a beginner.' +
                     '</p>',

            'subunits': {
                // Unit 1 - Grip
                'Grip':
                'asdf ;lkj asdf ;lkj asdf ;lkj asdf ;lkj asdf ;lkj ' +
                'fdsa jkl; fdsa jkl; fdsa jkl; fdsa jkl; fdsa jkl; ' +
                'asdf fdsa ;lkj jkl; asdf fdsa ;lkj jkl; ' +
                'asdf jkl; ;lkj fdsa asdf jkl; ;lkj fdsa ' +
                'ksl; jak; fk;s asl; jas; ;sl; fjas fjk; ' +
                'askl kjf; asdj ;fal dfla ;;ls ;ja; l;ds',

                // Unit 1 - Words
                'Words':
                'a a a; as as as; all all all; fall fall fall; ' +
                'lad lad lad; dad dad dad; fad fad fad; ass ass ass; ' +
                'salad salad salad; alfalfa alfalfa alfalfa; sa sa sa; ' +
                'add add add;',

                // Unit 1 - Control
                'Control':
                'd da dad; a al alf alfa alfal alfalf alfalfa; f fa fad; ' +
                's sa sal sala salad; a al all; a as ass; f fa fal fall;',

                // Unit 1 - Sentences
                'Sentences':
                'ask sall; ask sall; ask sall; ' +
                'a lad asks sall; a lad asks sall; a lad asks sall; ' +
                'ask dad; ask dad; ask dad; ' +
                'all lads fall; all lads fall; all lads fall;',

                // Unit 1 - Test
                'Test':
                'as all alfalfa; lad salad lad all dad; lad sall a ask; ' +
                'sall salad alfalfa; ask dad fad lad; all as a; dad fad ' +
                'alfalfa ass salad all as a dad; a lad asks sall; ' +
                'ask sall; ask dad; all lads fall;'
            }
        },

        // Unit 2
        {
            'title': 'ru',

            'guide': '<p>' +
                     'Use the left forefinger to type R and the right one ' +
                     'to type U. After striking the R or U keys, return ' +
                     'the forefingers back to the original position on ' +
                     'F or J.' +
                     '</p>',

            'subunits': {
                // Unit 2 - Grip
                'Grip':
                'frfr juju frfr juju frfr juju; ' +
                'rfrf ujuj rfrf ujuj rfrf ujuj; ' +
                'jrjr fufu jrjr fufu jrjr fufu; ' +
                'rjrj ufuf rjrj ufuf rjrj ufuf; ' +
                'asdfr ;lkju asdfr ;lkju asdfr ;lkju ' +
                'rfdsa ujkl; rfdsa ujkl; rfdsa ujkl; ' +
                'asdfr ujkl; asdfr ujkl; asdfr ujkl; ' +
                'asdfr rfdsa ;lkju ujkl; asdfr rfdsa ' +
                'asdfr ujkl; ;lkju rfdsa asdfr ujkl; ' +
                'urfu ujku rfur luru rjur arru ursr druj drur arsufr ' +
                'frrur jurru urrsu uusrr drlursu uslru frsusl arfu jfru',

                // Unit 2 - Words
                'Words':
                'far far far; fur fur fur; rar rar rar; lark lark lark; ' +
                'radar radar radar; surf surf surf; dull dull dull; ' +
                'urdu urdu urdu; full full full; rural rural rural; ' +
                'us us us; usual usual usual; laura laura laura; ' +
                'russ russ russ;',

                // Unit 2 - Control
                'Control':
                's su sur surf; r ra rad rada radar; f fu ful full; ' +
                'f fu fur; l la lar lark; u ur urd urdu; f fu fur; ' +
                'l la lau laur laura; f fa far; r ru rur rura rural;',

                // Unit 2 - Sentences
                'Sentences':
                'laura surfs as usual; laura surfs as usual; ' +
                'laura surfs as usual; ask russ; ask russ; ask russ;',

                // Unit 2 - Test
                'Test':
                'radar rural laura russ fur lark rar surf; ' +
                'far usual russ full lark laura dull; ' +
                'laura surfs as usual; ask russ;'
            }
        },

        // Unit 3
        {
            'title': 'vm',

            'guide': '<p>' +
                     'Use the left forefinger to type V and the right one ' +
                     'to type M.' +
                     '</p>',

            'subunits': {
                // Unit 3 - Grip
                'Grip':
                'fvfv jmjm fvfv jmjm fvfv jmjm; ' +
                'vfvf mjmj vfvf mjmj vfvf mjmj; ' +
                'jvjv fmfm jvjv fmfm jvjv fmfm; ' +
                'vjvj mfmf vjvj mfmf vjvj mfmf; ' +
                'fvrm jmuv fvrm jmuv fvrm jmuv; ' +
                'asdfv ;lkjm asdfrv ;lkjum asdfvr ;lkjmu ' +
                'avrm mvum mmvm mvlv vvmuv vrmv vmrlm svmvmk avsm ' +
                'rvasm svlmr svmvr dvmkv kmvlv rvlmv amvvm vvma mvmm',

                // Unit 3 - Words
                'Words':
                'madam madam madam; lava lava lava; malva malva malva; ' +
                'slam slam slam; mars mars mars; mask mask mask; ' +
                'uv uv uv; murmur murmur murmur; slum slum slum; ' +
                'mark mark mark; vasu vasu vasu; larva larva larva; ' +
                'dam dam dam; sam sam sam; vum vum vum; ' +
                'arm arm arm; mall mall mall; alarm alarm alarm;',

                // Unit 3 - Control
                'Control':
                'm ma mad mada madam; l la lav lava; m ma mas mask; ' +
                'm mu mur mur murm murmu murmur; v va vas vasu; ' +
                'l la lar larv larva; d da dam; v vu vum; u uv; ' +
                'm ma mar mars; s sl sla slam; a al ala alar alarm;',

                // Unit 3 - Sentences
                'Sentences':
                'madam murmurs; madam murmurs; madam murmurs; ' +
                'a mad vassal murmurs; a mad vassal murmurs; ' +
                'a mad vassal murmurs; ' +
                'mark all vassals; mark all vassals; mark all vassals;',

                // Unit 3 - Test
                'Test':
                'madam lava slum slam mask vasu sam alarm vum uv; ' +
                'mall alarm arm larva adam malva vum vasu mask; ' +
                'madam murmurs; a mad vassal murmurs; mark all vassals;'
            }
        },

        // Unit 4
        {
            'title': 'ei',

            'guide': '<p>' +
                     'Use the left middle finger to type E and the right ' +
                     'one to type I.' +
                     '</p>',

            'subunits': {
                // Unit 4 - Grip
                'Grip':
                'dede kiki dede kiki dede kiki; ' +
                'eded ikik eded ikik eded ikik; ' +
                'fefe jiji fefe jiji fefe jiji; ' +
                'efef ijij efef ijij efef ijij; ' +
                'deki iked deki iked deki iked; ' +
                'ekid dike ekid dike ekid dike; ' +
                'idek kedi idek kedi idek iked; ' +
                'aeds fers iukj iuea ediu edil; ' +
                'aeiru iuerr juiee ireel aerij afeei iieei eeeii eieie; ' +
                'iesdi sdiei aidef lijue iuefr ifese eikis iaser uieie;',

                // Unit 4 - Words
                'Words':
                'fire fire fire; field field field; are are are; ' +
                'riddle riddle riddle; killer killer killer; is is is; ' +
                'file file file; rise rise rise; side side side; ' +
                'read seed feed leave veal seal visa veer smear; ' +
                'lime slime dime vide save vase live vile ride free; ' +
                'smile simile familiar similar mere merrier',

                // Unit 4 - Control
                'Control':
                'r ri rid ridd riddl riddle; k ki kil kill kille killer; ' +
                's si sim simi simil simile; f fi fie fiel field; ' +
                'f fa fam fami famil famili familia familiar; ' +
                'v vi vil vile; l li liv live; s sm sme smea smear; ' +
                'l li lime lime; s sm smi smil smile; i is; a ar are;',

                // Unit 4 - Sentences
                'Sentences':
                'mike is a serial killer; mike is a serial killer; ' +
                'mike is a serial killer; dave is a skilled riddler; ' +
                'dave is a skilled riddler; dave is a skilled riddler; ' +
                'sam served a meal; see a fire drill; jim feeds a deer;',

                // Unit 4 - Test
                'Test':
                'fire field are riddle killer is file rise side read; ' +
                'rise side visa live dime vide ride vile smile familiar; ' +
                'slime skilled similar drill simile serial is see are; ' +
                'mike is a serial killer; dave is a skilled riddler; ' +
                'sam served a meal; see a fire drill; jim feeds a deer;',
            }
        },

        // Unit 5
        {
            'title': 'c,',

            'guide': '<p>' +
                     'Use the left middle finger to type C and the right ' +
                     'one to type , (comma).' +
                     '</p>',

            'subunits': {
                // Unit 5 - Grip
                'Grip':
                'dcdc k,k, dcdc k,k, dcdc k,k, ' +
                'cdcd ,k,k cdcd ,k,k cdcd ,k,k ' +
                'fcfc j,j, fcfc j,j, fcfc j,j, ' +
                'cfcf ,j,j cfcf ,j,j cfcf ,j,j ' +
                'dck, ,kcd dck, ,kcd dck, ,kcd ' +
                'ck,d d,kc ck,d d,kc ck,d d,kc ' +
                ',dck kcd, ,dck kcd, ,dck ,kcd ' +
                ',,cc cc,, c,c, ,c,c ,ic, c,ac, c,r;c ac;,; s,c;fd a,cd, ' +
                ';,,cv vc,a; cv,sk; ;l,vdj vcm, ,mdc cvi, ;i,c m,fc ec;,',

                // Unit 5 - Words
                'Words':
                'receive, circus, circle, maverick, class, mice; ice; ' +
                'fulcrum, care, cure, cafe, face, lace, race, claim; ' +
                'card, lack, service, car, camera, recursive, recess; ' +
                'cease, civil, camel, cave, cake, case, decade, crack;',

                // Unit 5 - Control
                'Control':
                'm ma mav mave maver maveri maveric maverick, ' +
                'f fu ful fulc fulcr fulcru fulcrum, m mi mic mice, ' +
                'r re rec rece recei receiv receive, c ca cas case, ' +
                'c ci cir circ circu circus, r re rec rece reces recess, ' +
                'c ce cea ceas cease, c ca cam came camer camera, ' +
                'r re rec recu recur recurs recursi recursiv recursive',

                // Unit 5 - Sentences
                'Sentences':
                'cecilia received a mail, carr likes camels, ' +
                'use a camera, calla kills mice, use a fulcrum, ' +
                'callula cured carlie',

                // Unit 5 - Test
                'Test':
                'maverick, fulcrum, cecilia, camera, recursive, camels, ' +
                'mice, lace, race, case, face, cave, civil, care, lace, ' +
                'claim, decade, cecilia received a mail, use a camera, ' +
                'calla kills mice, use a fulcrum, carr likes camels'
            }
        },

        // Unit 6
        {
            'title': 'gh',

            'guide': '<p>' +
                     'Use the left forefinger to type G and the right one ' +
                     'to type H. After striking the G or H keys, return ' +
                     'the forefingers back to the original position on ' +
                     'F or J.' +
                     '</p>',

            'subunits': {
                // Unit 6 - Grip
                'Grip':
                'fgfg jhjh fgfg jhjh fgfg jhjh; ' +
                'gfgf hjhj gfgf hjhj gfgf hjhj; ' +
                'fhfh gjgj fhfh gjgj fhfh gjgj; ' +
                'hfhf jgjg hfhf jgjg hfhf jgjg; ' +
                'asdfg ;lkjh asdfg ;lkjh asdfg ;lkjh asdfg ;lkh;' +
                'gfdsa hjkl; gfdsa hjkl; gfdsa hjkl; gfdsa hjkl; ' +
                'arhg, igdh, ikhvg, lcvhg, mgcfm, ehcgm, lhsgh, uhrgh; ' +
                'igghs, ghmvh, hchga, guehg, lchhg, ghcih, gilgh;',

                // Unit 6 - Words
                'Words':
                'hacker, cage, hair, jaguar, his, her, he, she, hire, ' +
                'shag, girl, egg, guru, greek, hum, ham, gum, drug, ' +
                'hug, giggle, hush, garage, aggressive, high, sigh, ' +
                'grave, glacier, heal, him, hide, guide, has, had, ' +
                'have, hear, here, flag, give, glad, shell, march',

                // Unit 6 - Control
                'Control':
                'g gi gig gigg giggl giggle, h hu hus hush, e eg egg, ' +
                'a ag agg aggr aggre aggre aggres aggress aggressi ' +
                'aggressiv aggressive, g gu gui guid guide, s sh she, ' +
                'h hi hig high, s si sig sigh, s sh sha shag, h he, ' +
                's sh she, g gi giv give, g ga gar gara garag garage',

                // Unit 6 - Sentences
                'Sentences':
                'she cracked five eggs, he likes half egg, she used drugs, ' +
                'gerard is a hacker, she has a hammer, he is aggressive, ' +
                'he hid himself here, guide him, he sighed, ' +
                'give me a high five',

                // Unit 6 - Test
                'Test':
                'hacker, jaguar, hire, shag, guru, garage, aggressive, ' +
                'he, she, his, her, him, hide, guide, egg, shell, sigh, ' +
                'high, she cracked five eggs, he likes half egg, ' +
                'he sighed, she has a hammer, he is aggressive, ' +
                'give me a high five'
            }
        },

        // Unit 7
        {
            'title': 'ty',

            'guide': '<p>' +
                     'Use the left forefinger to type T and the right one ' +
                     'to type Y.' +
                     '</p>',

            'subunits': {
                // Unit 7 - Grip
                'Grip':
                'ftft jyjy ftft jyjy ftft jyjy; ' +
                'tftf yjyj tftf yjyj tftf yjyj; ' +
                'fyfy tjtj fyfy tjtj fyfy tjtj; ' +
                'yfyf jtjt yfyf jtjt yfyf jtjt; ' +
                'ertyui iuytre ertyui iuytre ertyui iuytre; ' +
                'asdft ;lkjy asdfy ;lkjt aedtf ;ikyj adert ;kiuy ' +
                'afty ;jyt tety yjkt lyjt gyht athy sytg lhyg shdt svtm ' +
                'ctym vtyy, ,gytyv crttys sctyt l;tiy, kyhat sytay sytty ' +
                'lttys yytym mtyty syght ymtsy yctvy lytvy ;mtcvy sytaty',

                // Unit 7 - Words
                'Words':
                'harry, tight, light, very, merry, dry, height, try; ' +
                'sight, might, fry, cry, family, sally, mathematics; ' +
                'chemistry, fight, tyre, yell, the, there, this, them; ' +
                'jury, hay, heavy, lyre, tram, yacht, tuesday; ' +
                'thursday, friday, saturday, target, hit, fit, tackle; ' +
                'sky, year, thirsty, yet, may, july, august',

                // Unit 7 - Control
                'Control':
                't th thi thir thirs thirst thirsty, ' +
                'c ch che chem chemi chemis chemist chemistr chemistry, ' +
                't tu tue tues tuesd tuesda tuesday, t th thi this, ' +
                't th the ther there, t th the them, t ty tyr tyre, ' +
                'm ma mat math mathe mathem mathema mathemat mathemati ' +
                'mathematic mathematics',

                // Unit 7 - Sentences
                'Sentences':
                'harry studied mathematics yesterday, this is the tyre, ' +
                'sally likes chemistry, he hit them, let us fit it, ' +
                'hit the target accurately, let us catch the tram, ' +
                'matt has a yacht, she yelled at him, ' +
                'the teachers met everyday, this is my yacht',

                // Unit 7 - Test
                'Test':
                'harry, tight, light, merry, try, chemistry, tyre, yacht; ' +
                'tuesday, thursday, saturday, thirsty, year, hay, yet; ' +
                'the, this, there, them, thus; this is the tyre, ' +
                'harry studied mathematics yesterday, he hit them, ' +
                'this is my yacht, the teachers met everyday'
            }
        },

        // Unit 8
        {
            'title': 'bn',

            'guide': '<p>' +
                     'Use the left forefinger to type B and the right one ' +
                     'to type N.' +
                     '</p>',

            'subunits': {
                // Unit 8 - Grip
                'Grip':
                'fbfb jnjn fbfb jnjn fbfb jnjn; ' +
                'bfbf njnj bfbf njnj bfbf njnj; ' +
                'fnfn bjbj fnfn bjbj fnfn bjbj; ' +
                'nfnf jbjb nfnf jbjb nfnf jbjb; ' +
                'cvbnm, ,mnbvc cvbnm, ,mnbvc cvbnm, ,mnbvc; ' +
                'asdfb ;lkjn asdfn ;lkjb aedbf ;iknj aderb ;kiun ' +
                'afbn ;jnb bebn njkb lnjb gnhb abhn snbg lhng shdb svbm ' +
                'mhnb ,ibmn senbm nbmvn tnvnm dvln; lsvnm avnsm lsvne',

                // Unit 8 - Words
                'Words':
                'bean, bin, night, nifty, nibble, scrabble, be, best; ' +
                'banana, january, february, june, band, land, bind; ' +
                'december, sunday, blind, bend, abundance, benign; ' +
                'minimal, begin, bank, savant, urban, nebula, science',

                // Unit 8 - Control
                'Control':
                'a ab abu abun abund abunda abundan abundanc abundance, ' +
                'n ne neb nebu nebul nebula, b ba ban bana banan banana, ' +
                'b bl bli blin blind, b be beg begi begin, b bi bin, ' +
                'b be ben beni benig benign, b be ben bend',

                // Unit 8 - Sentences
                'Sentences':
                'nine blind men sat beside the bank, bill ate a banana, ' +
                'this city receives abundant rainfall in january, ' +
                'let us see a diffused nebula at night, ' +
                'crab nebula can be seen in tauras at night',

                // Unit 8 - Test
                'Test':
                'nine, men, nebula, remarkable, saturn, blind, benign, ' +
                'banana, bill, minimal, bank, night, bend, bean, bin, ' +
                'nine blind men sat beside the bank, ' +
                'crab nebula can be seen in tauras at night, ' +
                'this city receives abundant rainfall in january'
            }
        },

        // Unit 9
        {
            'title': 'wo',

            'guide': '<p>' +
                     'Use the left ring finger to type W and the right one ' +
                     'to type O.' +
                     '</p>',

            'subunits': {
                // Unit 9 - Grip
                'Grip':
                'swsw lolo swsw lolo swsw lolo; ' +
                'wsws olol wsws olol wsws olol; ' +
                'fwfw jojo fwfw jojo fwfw jojo; ' +
                'wfwf ojoj wfwf ojoj wfwf ojoj; ' +
                'swlo olws swlo olws swlo olws; ' +
                'wlos solw wlos solw wlos solw; ' +
                'oswl lwso oswl lwso oswl olws; ' +
                'awss fwrs oulj ouwa wsou wsol;',

                // Unit 9 - Words
                'Words':
                'what who why when which whom, wheel wind, good moot, ' +
                'sworn sow saw soot loot, war won welcome office will, ' +
                'world worse vow word, biology economics sociology, ' +
                'would whole sword wolf worm, now how orwelian work, ' +
                'owe onus new dew stew too to, weblog wobble womble, ' +
                'you we, monday wednesday, october november, wonder',

                // Unit 9 - Control
                'Control':
                'w we wel welc welco welcom welcome, w wo wor work, ' +
                'o or orw orwe orwel orweli orwelia orwelian, h ho how, ' +
                'w wh who whol whole, w we web webl weblo weblog, ' +
                's so soc soci socio sociol sociolo sociolog sociology, ' +
                's sw swo swor sword, w wh who whom',

                // Unit 9 - Sentences
                'Sentences':
                'do not introduce orwellian notions into this work, ' +
                'work for the good of the world, will you come to office ' +
                'tomorrow, how many swords do you have, ' +
                'do you know the new seven wonders of the world',

                // Unit 9 - Test
                'Test':
                'who how word world wonder would whole sword wolf worm, ' +
                'orwellian work owe weblog wobble womble wonder tomorrow, ' +
                'shower mower lower, will you come to office tomorrow, ' +
                'use the lawn mower, work for the good of the world, ' +
                'how many swords do you have'
            }
        },

        // Unit 10
        {
            'title': 'x.',

            'guide': '<p>' +
                     'Use the left ring finger to type X and the right one ' +
                     'to type . (dot).' +
                     '</p>',

            'subunits': {
                // Unit 10 - Grip
                'Grip':
                'sxsx l.l. sxsx l.l. sxsx l.l.; ' +
                'xsxs .l.l xsxs .l.l xsxs .l.l; ' +
                'fxfx j.j. fxfx j.j. fxfx j.j.; ' +
                'xfxf .j.j xfxf .j.j xfxf .j.j; ' +
                'sxl. .lxs sxl. .lxs sxl. .lxs; ' +
                'xl.s s.lx xl.s s.lx xl.s s.lx; ' +
                '.sxl lxs. .sxl lxs. .sxl .lxs; ' +
                'axss fxrs .ulj .uxa xs.u xs.l;',

                // Unit 10 - Words
                'Words':
                'axe axiom. latex maximum. axial exile. axion borax; ' +
                'codex excel. six. mix xenon. toxin tax. linux unix; ' +
                'hoax fax. fox reflex. wax extra. xerox fedex. ox text; ' +
                'exist exit. exert helix. galaxy hexadecimal. maxim tex; ' +
                'next relax. texas exam. exclude lexical;',


                // Unit 10 - Control
                'Control':
                'a ax axi axio axiom. x xe xen xeno xenon. s si six. ' +
                'e ex ext extr extra. g ga gal gala galax galaxy. ' +
                'h he hex hexa hexad hexade hexadec hexadeci hexadecim ' +
                'hexadecima hexadecimal. t te tex texa texas. b bo box. ' +
                'f fe fed fede fedex. t ta tax.',

                // Unit 10 - Sentences
                'Sentences':
                'there is a lexical analysis examination tomorrow. ' +
                'each dot is written as six hexadecimal digits. ' +
                'alex has six axes and sixteen oxen. ' +
                'the next exam is on number theory axioms.',

                // Unit 10 - Test
                'Test':
                'axe axiom exam exclude text next ox linux fedex alex. ' +
                'tax relax fedex texas exclude lexical maximum linux. ' +
                'there is a lexical analysis examination tomorrow. ' +
                'each dot is written as six hexadecimal digits.'
            }
        },

        // Unit 11
        {
            'title': 'qp',

            'guide': '<p>' +
                     'Use the left little finger to type Q and the ' +
                     'right one to type P.' +
                     '</p>',

            'subunits': {
                // Unit 11 - Grip
                'Grip':
                'aqaq opop aqaq opop aqaq opop. ' +
                'qaqa popo qaqa popo qaqa popo, ' +
                'fqfq jpjp fqfq jpjp fqfq jpjp; ' +
                'qfqf pjpj qfqf pjpj qfqf pjpj. ' +
                'aqop poqa aqop poqa aqop poqa, ' +
                'qopa apoq qopa apoq qopa apoq; ' +
                'paqo oqap paqo oqap paqo poqa. ' +
                'aqaa fqra puoj puqa qapu qapo.',

                // Unit 11 - Words
                'Words':
                'quick qwerty qualm qualify play phone people pupil. ' +
                'queen equip equiprobable quakeproof quilt pique qed. ' +
                'period quasi quantum queue lap paint expert equator. ' +
                'pen pencil pin quote quadruple paddle quirky prince. ' +
                'pint quart prime september quit whip plate piano page.',

                // Unit 11 - Control
                'Control':
                'q qu qui quic quick, p pe peri perio period, q qe qed. ' +
                'q qu qua quak quake quakep quakep quakepr quakepro ' +
                'quakeproo quakeproof, p pi piq piqu pique, p pe pen. ' +
                'q qu qua quad quadr quadru quadrup quadrupl quadruple, ' +
                'e eq equ equi equip.',

                // Unit 11 - Sentences
                'Sentences':
                'both events are equally probable. peter is a professor. ' +
                'procure the appropriate equipment. it is quakeproof. ' +
                'richard p. feynman is an expert in quantum physics. ' +
                'there are two cups in a pint and two pints in a quart. ' +
                'do not ask personal questions.',

                // Unit 11 - Test
                'Test':
                'qualify quality quantity plaque plate pique equip qed. ' +
                'both events are equally probable. it is quakeproof. ' +
                'there are two cups in a pint and two pints in a quart. ' +
                'procure the appropriate equipment.'
            }
        },

        // Unit 12
        {
            'title': 'z/',

            'guide': '<p>' +
                     'Use the left little finger to type Z and the ' +
                     'right one to type / (slash).' +
                     '</p>',

            'subunits': {
                // Unit 12 - Grip
                'Grip':
                'azaz o/o/ azaz o/o/ azaz o/o/. ' +
                'zaza /o/o zaza /o/o zaza /o/o, ' +
                'fzfz j/j/ fzfz j/j/ fzfz j/j/; ' +
                'zfzf /j/j zfzf /j/j zfzf /j/j. ' +
                'azo/ /oza azo/ /oza azo/ /oza, ' +
                'zo/a a/oz zo/a a/oz zo/a a/oz; ' +
                '/azo oza/ /azo oza/ /azo /oza. ' +
                'azaa fzra /uoj /uza za/u za/o.',

                // Unit 12 - Words
                'Words':
                'jazz wizard lazy / ooze zeal quiz / ablaze bazar buzz / ' +
                'czar cozy dozen / dazzle enzyme gaze / maze size zeta / ' +
                'zigzag zoo zinc / zoom fizz puzzle / nozzle pizza zip / ' +
                'zero zioty zit / zone seize doze / ozone frieze frizz / ' +
                'maximize minimize organize / realize prize quantize /',

                // Unit 12 - Control
                'Control':
                'z zi zig zigz zigza zigzag / p pi piz pizz pizza / ' +
                'n no noz nozz nozzl nozzle / o oz ozo ozon ozone / ' +
                'm ma max maxi maxim maximi maximiz maximize / ' +
                'o or org orga organ organi organiz organize / ' +
                'c cz cza czar / z zi zin zinc / f fi fiz fizz',

                // Unit 12 - Sentences
                'Sentences':
                'a zephyr client called tzc is available for gnu/linux / ' +
                'we should minimize pollution to save the ozone layer / ' +
                'pizzeria is a shop where pizzas are made and sold / ' +
                'we have ordered a dozen pizzas for the quiz participants',

                // Unit 12 - Test
                'Test':
                'zigzag, nozzle, minimize, maximize, fizz, zinc, czar, ' +
                'pizza, zoo, boy/girl, single/married, m/f, gnu/linux, ' +
                'we should minimize pollution to save the ozone layer, ' +
                'we have ordered a dozen pizzas for the quiz participants'
            }
        },

        // Unit 13
        {
            'title': "'",

            'guide': '<p>' +
                     "Use the right little finger to type ' (single " +
                     'quotation marks.' +
                     '</p>',

            'subunits': {
                // Unit 13 - Grip
                'Grip':
                "'cla 'mai 'lsi 'kji 'mne 'uyz 'oxb 'gar 'vmn 'xzl 'ovc " +
                "js'a pa'u do'a uy'b si'n ym'l pj's yn's wv'u ug'x tn'p " +
                "ymo' aqo' wqp' pws' wip' yts' irm' ika' lkw' lrx' oip' " +
                "fj'a mi's n'hs la'i w'by si'b 'ivk 'd'p '//' ''p/ ap/' " +
                "'pa/ 'ox/ /aq' 'ixr ;';' ';p/ a';q rpx' g;x' b'y; e/d'",

                // Unit 13 - Words
                'Words':
                "we're you're, he's, she's, it's, they're; isn't wasn't; " +
                "we'd, you'd, he'd, she'd, they'd; can't couldn't; " +
                "you'll, he'll, she'll, they'll; here's there's; " +
                "aren't, weren't; what's where's; don't, didn't;",

                // Unit 13 - Control
                'Control':
                "w we we' we'r we're, y yo you you' you'r you're, " +
                "y yo you you' you'l you'll, s sh she she' she'l she'll, " +
                "i is isn isn' isn't, h he he' he'l he'll",

                // Unit 13 - Sentences
                'Sentences':
                "it's raining. i don't read jack's blogs. he'll come now. " +
                "mumbai isn't the capital of india. don't shout here. " +
                "that's the book we need to learn bernoulli's principle. " +
                "hilbert's paradox of the grand hotel deals with infinity.",

                // Unit 13 - Test
                'Test':
                "we're you're she'll he'll isn't don't didn't can't " +
                "i don't read jack's blogs. don't shout here. " +
                "that's the book we need to learn bernoulli's principle. " +
                "hilbert's paradox of the grand hotel deals with infinity."
            }
        },

        // Unit 14
        {
            'title': 'shift',

            'guide': '<p>' +
                     'Press the shift key with the little finger. To type ' +
                     'a capital letter, first press and hold the shift key ' +
                     'with one hand, hit the letter with the appropriate ' +
                     'finger of the other hand and then release the shift ' +
                     'key.' +
                     '</p><p>' +
                     'Do not hit the shift key and the letter key with ' +
                     'fingers of the same hand. Before hitting the letter ' +
                     'think which hand will be used to type the letter. ' +
                     'Use the alternate hand to hold the shift key and ' +
                     'then type the letter. This will will require some ' +
                     'effort in the beginning. You will gain speed as you ' +
                     'practice this unit.' +
                     '</p><p>' +
                     'For example, to type F, first press and hold the ' +
                     'right shift key with the right little finger, hit ' +
                     'the F key with left forefinger and then release the ' +
                     'shift key. After this return both the fingers ' +
                     'immediately to the home row.' +
                     '</p><p>',


            'subunits': {
                // Unit 14 - Grip
                'Grip':
                'aAbB cCdD eEfF gGhH aAbB cCdD eEfF gGhH; ' +
                'iIjJ kKlL mMnN oOpP iIjJ kKlL mMnN oOpP; ' +
                'qQrR sStT uUvV wWxX qQrR sStT uUvV wWxX; ' +
                'yYzZ yYzZ QWERT YUIOP; ASDFG LKJH; ZXCVB MN; ' +
                'ABCD EFGH ABCD EFGH IJKL MNOP IJKL MNOP; ' +
                'QRST UVWX QRST UVWX YZ YZ; UxWm YwnF VpAs BiKv CoGl ' +
                'DbJc QeZr HkXy LpOq EuzT MfNg RhjS tIBd',

                // Unit 14 - Words
                'Words':
                'January February March April May June July August ' +
                'September October November December, USA UAE India UK ' +
                'Sri Lanka Egypt, New Delhi New York Moscow Brisbane ' +
                'Donald E. Knuth, Dennis M. Ritchie, S. Ramanujan',

                // Unit 14 - Control
                'Control':
                'U US USA, U UA UAE, U UK, M Ma Mar Marc Marc March, ' +
                'D Do Don Dona Donal Donald Donald, I In Ind Indi India, ' +
                'O Oc Oct Octo Octob Octobe October, E Eg Egy Egyp Egypt, ' +
                'M Mo Mos Mosc Mosco Moscow',

                // Unit 14 - Sentences
                'Sentences':
                'New Delhi is the capital of India. I am intelligent. ' +
                'You should finish the work by June. I love music. ' +
                'Dennis M. Ritchie developed the C programming language. ' +
                'TeX was developed by Donald E. Knuth.' +
                'GNU/Linux is a free and open source operating system.',

                // Unit 14 - Test
                'Test':
                'USA UK UAE March India ZIP PIN SSL SSN PAN GNU/Linux ' +
                'Donald E. Knuth, Dennis M. Ritchie, Richard Stallman, ' +
                'I love music. New Delhi is the capital of India. ' +
                'Dennis M. Ritchie developed the C programming language. ' +
                'TeX was developed by Donald E. Knuth.'
            }
        },

        // Unit 15
        {
            'title': 'simple passages',

            'guide': '<p>' +
                     'Type the simple passages with the correct fingers ' +
                     'as practiced in the previous units.' +
                     '</p>',

            'subunits': {
                // Unit 15 - Hyperspace
                'Hyperspace':
                "To Riemann, Euclid's geometry was particularly sterile " +
                'when compared with the rich diversity of the world. ' +
                'Nowhere in the natural world do we see the flat, ' +
                'idealized geometric figures of Euclid. Mountain ranges, ' +
                'ocean waves, clouds, and whirlpools are not perfect ' +
                'circles, triangles, and squares, but are curved objects ' +
                'that bend and twist in infinite diversity.',

                // Unit 15 - Vedanta
                'Vedanta':
                'Maya is a statement of the fact of this universe, of ' +
                'how it is going on. People generally get frightened ' +
                'when these things are told to them. But bold we must ' +
                'be. Hiding facts is not the way to remedy.',

                // Unit 15 - On Painting
                'On Painting':
                'The first thing to know is that a point is a sign which ' +
                'one might say is not divisible into parts. I call a ' +
                'sign anything which exists on a surface so that it is ' +
                'visible to the eye. No one will deny that things which ' +
                'are not visible do not concern the painter, for he ' +
                'strives to represent only the things that are seen.'
            }
        },

        // Unit 16
        {
            'title': '58',

            'guide': '<p>' +
                     'Use the left forefinger to type 5 and the right one ' +
                     'to type 8.' +
                     '</p>',

            'subunits': {
                // Unit 16 - Grip
                'Grip':
                'f5f5 j8j8 f5f5 j8j8 f5f5 j8j8; ' +
                '5f5f 8j8j 5f5f 8j8j 5f5f 8j8j; ' +
                'j5j5 f8f8 j5j5 f8f8 j5j5 f8f8; ' +
                '5j5j 8f8f 5j5j 8f8f 5j5j 8f8f; ' +
                'f5r8 j8u5 f5r8 j8u5 f5r8 j8u5; ' +
                'asdf5 ;lkj8 asdfr5 ;lkju8 asdf5r ;lkj8u ' +
                'a5r8 85u8 8858 85l5 558u5 5r85 58rl8 s5858k a5s8 ' +
                'r5as8 s5l8r s585r d58k5 k85l5 r5l85 a8558 558a 8588',

                // Unit 16 - Words
                'Words':
                '5 books, 8 sentences, 58 words, 5858 students, 85 cars, ' +
                '88 constellations, 55 journals, 5 laptops, 58 bottles, ' +
                '85 cities, 855 buildings, 588 pens, 858 trains, ' +
                '585 buses',

                // Unit 16 - Control
                'Control':
                '5 58 585 5858 58585 585858 8 88 885 8855 88558 885585 ' +
                '8 85 858 8585 85858 858585 5 55 558 5588 55885 558858',

                // Unit 16 - Sentences
                'Sentences':
                'John has about 55 science books. There are 8 planets. ' +
                'There are 88 constellations. Area code 585 is a state ' +
                'of New York area code. 58 candidates will be selected.',

                // Unit 16 - Test
                'Test':
                '5 58 585 85 85 58 85 85 58 588 588 855 8558 588 588 85; ' +
                '5 books, 8 sentences, 58 words, 5858 students, 85 cars; ' +
                'There are 88 constellations. John has about 55 science ' +
                'books.'
            }
        },

        // Unit 17
        {
            'title': '49',

            'guide': '<p>' +
                     'Use the left middle finger to type 4 and the right ' +
                     'one to type 9.' +
                     '</p>',

            'subunits': {
                // Unit 17 - Grip
                'Grip':
                'd4d4 k9k9 d4d4 k9k9 d4d4 k9k9; ' +
                '4d4d 9k9k 4d4d 9k9k 4d4d 9k9k; ' +
                'k4k4 d9d9 k4k4 d9d9 k4k4 d9d9; ' +
                '4k4k 9d9d 4k4k 9d9d 4k4k 9d9d; ' +
                'd4r9 k9u4 d4r9 k9u4 d4r9 k9u4; ' +
                'd4r8 k9u4 d4r8 k9u4 d8r9 k9u4; ' +
                'a8dd4 8akk9 as5dr4 5akku9 5s8d4r 8a5k9u ' +
                'a4r9 94u8 9549 94s4 489u4 4r95 49rd5 s4549k a4s98 ' +
                'r4as9 s4a98 s594r d49k5 k98a4 r5a94 a9849 849a 949598',

                // Unit 17 - Words
                'Words':
                '4 pens, 9 pencils, 49 buses, 5945 items, 99 words, ' +
                '44 hens, 45 tests, 94 samples, 9454 roads, 94 sticks, ' +
                '545 villages, 954 seats, 598 labels, 549 calls',

                // Unit 17 - Control
                'Control':
                '4 44 449 4499 44998 449985 9 94 948 9488 94885 948859 ' +
                '9 98 984 9844 98445 984459 4 48 489 4899 48994 489945',

                // Unit 17 - Sentences
                'Sentences':
                'The sum of 44 and 55 is 99. 44 is one less than 45. ' +
                '89 is one more than 99. 45 is a multiple of 9.',

                // Unit 17 - Test
                'Test':
                '4 49 94 9445 9844 9845 4589 9845 4458 4459 449 984 995; ' +
                '4 pens, 45 tests, 5945 items, 99 words, 94 samples; ' +
                'The sum of 44 and 55 is 99. 44 is one less than 45.'
            }
        },

        // Unit 18
        {
            'title': '67',

            'guide': '<p>' +
                     'Use the left forefinger to type 6 and the right one ' +
                     'to type 7.' +
                     '</p>',

            'subunits': {
                // Unit 18 - Grip
                'Grip':
                'f6f6 j7j7 f6f6 j7j7 f6f6 j7j7; ' +
                '6f6f 7j7j 6f6f 7j7j 6f6f 7j7j; ' +
                'j6j6 f7f7 j6j6 f7f7 j6j6 f7f7; ' +
                '6j6j 7f7f 6j6j 7f7f 6j6j 7f7f; ' +
                'f6r7 j7u6 f6r7 j7u6 f6r7 j7u6; ' +
                'asff6 ;ljj7 asffr6 ;ljju7 asff6r ;ljj7u ' +
                'a6r7 76u7 7767 76l6 667u6 6r76 67rl7 s6767j a6s7 ' +
                'r6as7 s6l7r s676r f67j6 j76l6 r6l76 a7667 667a 7677',

                // Unit 18 - Words
                'Words':
                '6 horses, 7 days, 77 elephants, 67 pipes, 76 stones, ' +
                '776 eggs, 765 pages, 46 chapters, 78 questions, ' +
                '56 answers, 664 schools, 779 tricks, 68 pins, 687 bins',

                // Unit 18 - Control
                'Control':
                '6 66 667 6677 66774 667745 7 76 768 7688 76885 768857 ' +
                '7 78 786 7896 78965 789657 6 68 687 6877 68776 687769',

                // Unit 18 - Sentences
                'Sentences':
                "67 is a prime number but 76 isn't. 679 is a multiple of" +
                '97. 676 is one less than 677. 767 is a multiple of 59.',

                // Unit 18 - Test
                'Test':
                '66 76 77 78 677 769 976 975 9756 568 485 9478 4588 465; ' +
                '6 horses, 7 days, 664 schools, 779 tricks, 56 answers; ' +
                "67 is a prime number but 76 isn't. 676 is one less than 677."
            }
        },

        // Unit 19
        {
            'title': '30',

            'guide': '<p>' +
                     'Use the left ring finger to type 6 and the right ' +
                     'one to type 7.' +
                     '</p>',

            'subunits': {
                // Unit 19 - Grip
                'Grip':
                's3s3 l0l0 s3s3 l0l0 s3s3 l0l0; ' +
                '3s3s 0l0l 3s3s 0l0l 3s3s 0l0l; ' +
                'l3l3 s0s0 l3l3 s0s0 l3l3 s0s0; ' +
                '3l3l 0s0s 3l3l 0s0s 3l3l 0s0s; ' +
                's3r0 l0u3 s3r0 l0u3 s3r0 l0u3; ' +
                'asss3 ;lll0 asssr3 ;lllu0 asss3r ;lll0u ' +
                'a3r0 03u0 0030 03l3 330u3 3r03 30rl0 s3030l a3s0 ' +
                'q3ks0 s3l0n s303o w30l3 o03l3 m3l03 a0330 330a 0300',

                // Unit 19 - Words
                'Words':
                '30 days, 300 lions, 303 buses, 367 numbers, 70 years, ' +
                '73 goals, 40 names, 83 bytes, 50 tables, 80 tables, ' +
                '35 cars, 307 sets, 360 mails, 630 books, 305 diaries',

                // Unit 19 - Control
                'Control':
                '3 34 340 3400 34003 340035 0 03 038 0387 03870 038703 ' +
                '0 07 076 0763 07633 076330 3 30 309 3093 30930 309303',

                // Unit 19 - Sentences
                'Sentences':
                'April has 30 days. There are 365 days in a year. ' +
                '390 is a multiple of 3. 37 is a prime number.',

                // Unit 19 - Test
                'Test':
                '34 30 365 70 30 90 53 80 73 50 3580 3470 9074 7030 7037; ' +
                '30 days, 630 books, 80 tables, 83 bytes, 307 sets, ' +
                '35 cars; April has 30 days. There are 365 days in a year.'
            }
        },

        // Unit 20
        {
            'title': '12',

            'guide': '<p>' +
                     'Use the left little finger to type 1 as well as 2.' +
                     '</p>',

            'subunits': {
                // Unit 20 - Grip
                'Grip':
                'a1a1 q2q2 a1a1 q2q2 a1a1 q2q2; ' +
                '1a1a 2q2q 1a1a 2q2q 1a1a 2q2q; ' +
                'q1q1 a2a2 q1q1 a2a2 q1q1 a2a2; ' +
                '1q1q 2a2a 1q1q 2a2a 1q1q 2a2a; ' +
                'a1z2 p2q1 a1p2 p2u1 a1z2 q2p1; ' +
                'aaaa1 ;qqq2 aaaar1 ;p1qu2 a2ap1r ;1pq2u ' +
                'a1p2 21z2 2212 21q1 112u1 1r21 12rq2 a1212q a1a2 ' +
                'q1ka2 a1q2n a121o j12q1 o21q1 m1q21 a2112 112a 2122',

                // Unit 20 - Words
                'Words':
                '12 months, 21 days, 52 weeks, 11 books, 22 notes, 2 pens, ' +
                '121 points, 132 trials, 82 tosses, 192 attempts, 21 pins, ' +
                '14 stories, 511 passengers, 122 bottles, 811 buildings',

                // Unit 20 - Control
                'Control':
                '1 12 121 1218 12182 121822 2 27 271 2719 27192 271922 ' +
                '2 24 241 2415 24158 241581 1 18 182 1821 18211 182112',

                // Unit 20 - Sentences
                'Sentences':
                'There are 12 months and 52 weeks in a year. Square of 11 ' +
                'is 121. 22 is one more than 21. 211 is a prime number.',

                // Unit 20 - Test
                'Test':
                '12 21 52 11 22 2 121 132 82 192 21 14 511 122 811 917; ' +
                '12 months, 52 weeks, 121 points, 82 tosses, 192 attempts; ' +
                'There are 12 months and 52 weeks in a year. ' + 
                '211 is a prime number. Square of 11 is 121.'
            }
        },
        // Unit 21
        {
            'title': 'passages',

            'guide': '<p>' +
                     'Type the passages with the correct fingers as ' +
                     'practiced in the previous units. For special ' +
                     'symbols not covered in the previous units, it ' +
                     'is fine to look at the keyboard and type.' +
                     '</p>',

            'subunits': {
                // Unit 21 - Relativity
                'Relativity':
                'Lightning has struck the rails on our railway embankment ' +
                'at two places A and B far distant from each other. I ' +
                'make the additional assertion that these two lightning ' +
                'flashes occurred simultaneously. If I ask you whether ' +
                'there is sense in this statement, you will answer my ' +
                'question with a decided "Yes." But if I now approach ' +
                'you with the request to explain to me the sense of the ' +
                'statement more precisely, you find after some ' +
                'consideration that the answer to this question is not ' +
                'so easy as it appears at first sight.',

                // Unit 21 - Mathematical Mysteries
                'Mathematical Mysteries':
                'The instructor was incredulous that this new student ' +
                'could add 100 terms so quickly and he assumed that answer ' +
                'would be wrong. However, when all the other students ' +
                'had finally finished their work and placed their ' +
                "slates upon the table, the instructor turned Gauss' " +
                'slate over and read the correct answer: 5050. How had ' +
                'Gauss done it? Gauss noticed that the first term, 1, ' +
                'and the last term, 100, added together to be 101. Then ' +
                'he realized that the second term, 2, and the next-to-last ' +
                'term, 99, also added together to be 101. In fact, if he ' +
                'kept adding pairs of terms in this manner, he would get ' +
                '50 pairs of sums, each sum equal to 101. Fifty multiplied ' +
                'by 101 is 5050!',

                // Unit 21 - The Code Book
                'The Code Book':
                'The next morning, Rivest handed the paper to Adleman, ' +
                'who went through his usual process of trying to tear ' +
                'it apart, but this time he could find no faults. His ' +
                'only criticism was with the list of authors. "I told ' +
                'Ron to take my name off this paper," recalls Adleman. ' +
                '"I told him that it was his invention, not mine. But ' +
                'Ron refused and we got into a discussion about it. We ' +
                'agreed that I would go home and contemplate it for one ' +
                'night, and consider what I wanted to do. I went back the ' +
                'next day and suggested Ron that I be the third author. I ' +
                'recall thinking that this paper would be the least ' +
                'interesting paper that I will ever be on." Adleman could ' +
                'not have been more wrong. The system, dubbed RSA ' +
                '(Rivest, Shamir, Adleman) as opposed to ARS, went on to ' +
                'become the most influential cipher in modern cryptography.'
            }
        }
    ],

    // Label to be used to identify the main units
    'mainLabel': '6-7 split',

    // The message to be displayed to the user to make sure he really
    // wants to move to the main units
    'mainConfirmMessage':
        'You are about to choose the 6-7 split style to type the ' +
        'number keys. This means you are choosing to type the ' +
        'numbers 1 to 6 with the left hand and the numbers 7 to 0 ' +
        'with the right hand.\n\n' +
        'This is the traditional style of typing the number keys, ' +
        'and most ergonomic split keyboards support this style, i.e ' +
        'they have the 6 key on the left side of the split and 7 on ' +
        'the right side of the split.\n\n' +
        'It is recommended that you learn only one split style and ' +
        'stick with it. If you choose this style, there is no ' +
        'need to learn the 5-6 style later.\n\n' +
        'Do you want to proceed with learning to touch type the ' +
        'number keys with the 6-7 split style?',

    // The message to be displayed to the user to make sure he really
    // wants to move to the main units
    'alternateConfirmMessage':
        'You are about to choose the 5-6 split style to type the ' +
        'number keys. This means you are choosing to type the ' +
        'numbers 1 to 5 with the left hand and the numbers 6 to 0 ' +
        'with the right hand.\n\n' +
        'Note that most ergonomic split keyboards have the 6 key ' +
        'on the left side of the split. Also, most normal keyboards ' +
        'have the 6 key closer to the F key than it is to the J key ' +
        'Therefore, 6-7 split style is the recommended style to ' +
        'learn typing the number keys. However, it is perfectly ' +
        'fine to learn the 5-6 style if it is more convenient for ' +
        'your keyboard.\n\n' +
        'It is recommended that you learn only one split style and ' +
        'stick with it. If you choose this style, there is no ' +
        'need to learn the 6-7 style later.\n\n' +
        'Do you want to proceed with learning to touch type the ' +
        'number keys with the 5-6 split style?',

    // Label to be used to identify the alternate units
    'alternateLabel': '5-6 split',

    // Unit number where the alternate unit begins
    'alternateStart': 16,

    // 5-6 split style (6 with right hand)
    'alternate': [
        // Alt: Unit 16
        {
            'title': '47',

            'guide': '<p>' +
                     'Use the left forefinger to type 4 and the right one ' +
                     'to type 7.' +
                     '</p>',

            'subunits': {
                // Alt: Unit 16 - Grip
                'Grip':
                'f4f4 j7j7 f4f4 j7j7 f4f4 j7j7; ' +
                '4f4f 7j7j 4f4f 7j7j 4f4f 7j7j; ' +
                'j4j4 f7f7 j4j4 f7f7 j4j4 f7f7; ' +
                '4j4j 7f7f 4j4j 7f7f 4j4j 7f7f; ' +
                'f4r7 j7u4 f4r7 j7u4 f4r7 j7u4; ' +
                'asdf4 ;lkj7 asdfr4 ;lkju7 asdf4r ;lkj7u ' +
                'a4r7 74u7 7747 74l4 447u4 4r74 47rl7 s4747k a4s7 ' +
                'r4as7 s4l7r s474r d47k4 k74l4 r4l74 a7447 447a 7477',

                // Alt: Unit 16 - Words
                'Words':
                '4 books, 7 sentences, 47 words, 4747 students, 74 cars, ' +
                '44 journals, 4 laptops, 47 bottles, 74 days, 44 years, ' +
                '74 cities, 744 buildings, 477 pens, 747 trains, ' +
                '474 buses',

                // Alt: Unit 16 - Control
                'Control':
                '4 47 474 4747 47474 474747 7 77 774 7744 77447 774474 ' +
                '7 74 747 7474 74747 747474 4 44 447 4477 44774 447747',

                // Alt: Unit 16 - Sentences
                'Sentences':
                'John has about 44 science books. ' +
                'There are 7 days in a week. ' +
                '47 candidates will be selected. ' +
                'I have 4 pens and 7 pencils. ' +
                "47 is a prime number but 74 isn't",

                // Alt: Unit 16 - Test
                'Test':
                '4 47 474 74 74 47 74 74 47 477 477 744 7447 477 477 74; ' +
                '4 books, 7 sentences, 47 words, 4747 students, 74 cars; ' +
                'John has about 44 science books. ' +
                'There are  days in a week. ' +
                '47 candidates will be selected.'
            }
        },

        // Alt: Unit 17
        {
            'title': '38',

            'guide': '<p>' +
                     'Use the left middle finger to type 3 and the right ' +
                     'one to type 8.' +
                     '</p>',

            'subunits': {
                // Alt: Unit 17 - Grip
                'Grip':
                'd3d3 k8k8 d3d3 k8k8 d3d3 k8k8; ' +
                '3d3d 8k8k 3d3d 8k8k 3d3d 8k8k; ' +
                'k3k3 d8d8 k3k3 d8d8 k3k3 d8d8; ' +
                '3k3k 8d8d 3k3k 8d8d 3k3k 8d8d; ' +
                'd3r8 k8u3 d3r8 k8u3 d3r8 k8u3; ' +
                'asdd3 ;lkk8 asddr3 ;lkku8 asdd3r ;lkk8u ' +
                'a3r8 83u8 8838 83l3 338u3 3r83 38rl8 s3838k a3s8 ' +
                'r3as8 s3l8r s383r d38k3 k83l3 r3l83 a8338 338a 8388',

                // Alt: Unit 17 - Words
                'Words':
                '3 pens, 8 pencils, 38 buses, 4834 items, 88 words, ' +
                '33 hens, 34 tests, 83 samples, 8343 roads, 83 sticks, ' +
                '434 villages, 843 seats, 88 constellations, 438 calls',

                // Alt: Unit 17 - Control
                'Control':
                '3 33 338 3388 33888 338884 8 83 838 8388 83884 838848 ' +
                '8 88 883 8833 88334 883348 3 38 388 3888 38883 388834',

                // Alt: Unit 17 - Sentences
                'Sentences':
                'The sum of 33 and 44 is 77. 33 is one less than 34. ' +
                '88 is one more than 87. 48 is a multiple of 3. ' +
                'There are 88 constellations.',

                // Alt: Unit 17 - Test
                'Test':
                '3 38 83 8334 8833 8834 3488 8834 3348 3348 338 883 884; ' +
                '3 pens, 34 tests, 4834 items, 88 words, 83 samples; ' +
                'The sum of 33 and 44 is 77. 48 is a multiple of 3. ' +
                'There are 88 constellations.'
            }
        },

        // Alt: Unit 18
        {
            'title': '56',

            'guide': '<p>' +
                     'Use the left forefinger to type 5 and the right one ' +
                     'to type 6.' +
                     '</p>',

            'subunits': {
                // Alt: Unit 18 - Grip
                'Grip':
                'f5f5 j6j6 f5f5 j6j6 f5f5 j6j6; ' +
                '5f5f 6j6j 5f5f 6j6j 5f5f 6j6j; ' +
                'j5j5 f6f6 j5j5 f6f6 j5j5 f6f6; ' +
                '5j5j 6f6f 5j5j 6f6f 5j5j 6f6f; ' +
                'f5r6 j6u5 f5r6 j6u5 f5r6 j6u5; ' +
                'asff5 ;ljj6 asffr5 ;ljju6 asff5r ;ljj6u ' +
                'a5r6 65u6 6656 65l5 556u5 5r65 56rl6 s5656j a5s6 ' +
                'r5as6 s5l6r s565r f56j5 j65l5 r5l65 a6556 556a 6566',

                // Alt: Unit 18 - Words
                'Words':
                '5 horses, 6 dogs, 66 elephants, 56 pipes, 65 stones, ' +
                '665 eggs, 655 pages, 45 chapters, 68 questions, ' +
                '55 answers, 554 schools, 667 tricks, 58 pins, 586 bins',

                // Alt: Unit 18 - Control
                'Control':
                '5 55 556 5566 55664 556645 6 65 658 6588 65885 658856 ' +
                '6 68 685 6875 68755 687556 5 58 586 5866 58665 586657',

                // Alt: Unit 18 - Sentences
                'Sentences':
                "56 is an even number but 65 isn't. " +
                '656 is a multiple of 8. ' +
                '565 is one less than 566. 6566 is a multiple of 67. ' +
                'There are 366 days in a leap year.',

                // Alt: Unit 18 - Test
                'Test':
                '55 65 66 68 566 656 665 565 6655 558 485 6468 4588 455; ' +
                '5 horses, 6 days, 554 schools, 665 tricks, 55 answers; ' +
                '6566 is a multiple of 67. There are 366 days in a leap year.'
            }
        },

        // Alt: Unit 19
        {
            'title': '29',

            'guide': '<p>' +
                     'Use the left ring finger to type 2 and the right ' +
                     'one to type 9.' +
                     '</p>',

            'subunits': {
                // Alt: Unit 19 - Grip
                'Grip':
                's2s2 l9l9 s2s2 l9l9 s2s2 l9l9; ' +
                '2s2s 9l9l 2s2s 9l9l 2s2s 9l9l; ' +
                'l2l2 s9s9 l2l2 s9s9 l2l2 s9s9; ' +
                '2l2l 9s9s 2l2l 9s9s 2l2l 9s9s; ' +
                's2r9 l9u2 s2r9 l9u2 s2r9 l9u2; ' +
                'asss2 ;lll9 asssr2 ;lllu9 asss2r ;lll9u ' +
                'a2r9 92u9 9929 92l2 229u2 2r92 29rl9 s2929l a2s9 ' +
                'q2ks9 s2l9n s292o w29l2 o92l2 m2l92 a9229 229a 9299',

                // Alt: Unit 19 - Words
                'Words':
                '29 days, 299 lions, 292 buses, 267 numbers, 79 years, ' +
                '72 goals, 49 names, 82 bytes, 59 tables, 89 tables, ' +
                '25 cars, 297 sets, 269 mails, 629 books, 295 diaries',

                // Alt: Unit 19 - Control
                'Control':
                '2 24 249 2499 24992 249925 9 92 928 9287 92879 928792 ' +
                '9 97 976 9762 97622 976229 2 29 299 2992 29929 299292',

                // Alt: Unit 19 - Sentences
                'Sentences':
                "29 is a prime number but 92 isn't. 23 divides 92. " +
                '9 does not divide 92. 992 is 3 more than 989.',

                // Alt: Unit 19 - Test
                'Test':
                '24 29 265 79 29 99 52 89 72 59 2589 2479 9974 7929 7927; ' +
                '29 days, 629 books, 89 tables, 82 bytes, 297 sets; ' +
                '23 divides 92. 9 does not divide 92. 992 is 3 more than 989.'
            }
        },

        // Alt: Unit 20
        {
            'title': '10',

            'guide': '<p>' +
                     'Use the left little finger to type 1 and the right ' +
                     'one to type 0.' +
                     '</p>',

            'subunits': {
                // Alt: Unit 20 - Grip
                'Grip':
                'a1a1 q0q0 a1a1 q0q0 a1a1 q0q0; ' +
                '1a1a 0q0q 1a1a 0q0q 1a1a 0q0q; ' +
                'q1q1 a0a0 q1q1 a0a0 q1q1 a0a0; ' +
                '1q1q 0a0a 1q1q 0a0a 1q1q 0a0a; ' +
                'a1z0 p0q1 a1p0 p0u1 a1z0 q0p1; ' +
                'aaaa1 ;qqq0 aaaar1 ;p1qu0 a0ap1r ;1pq0u ' +
                'a1p0 01z0 0010 01q1 110u1 1r01 10rq0 a1010q a1a0 ' +
                'q1ka0 a1q0n a101o j10q1 o01q1 m1q01 a0110 110a 0100',

                // Alt: Unit 20 - Words
                'Words':
                '100 days, 101 tricks, 10 weeks, 11 books, 1001 notes, ' +
                '101 points, 130 trials, 80 tosses, 190 attempts, 21 pins, ' +
                '14 stories, 511 passengers, 100 bottles, 811 buildings',

                // Alt: Unit 20 - Control
                'Control':
                '1 10 101 1018 10180 101800 0 07 071 0719 07190 071900 ' +
                '0 04 041 0415 04158 041581 1 18 180 1801 18011 180110',

                // Alt: Unit 20 - Sentences
                'Sentences':
                'There are 12 months and 52 weeks in a year. Square of 101 ' +
                'is 10201. 11 and 101 are prime numbers. 11001001 is a ' +
                'multiple of 11.',

                // Alt: Unit 20 - Test
                'Test':
                '10 01 50 11 00 0 101 130 80 190 01 14 511 100 811 917; ' +
                '100 days, 101 tricks, 80 tosses, 190 attempts, ' +
                '1001 notes; Square of 101 is 10201. ' +
                '11 and 101 are prime numbers. ' +
                '11001001 is a multiple of 11.'
            }
        },
    ]
}
