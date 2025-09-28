Developer Notes
===============

Release Checklist
-----------------

 1. Update version in [package.json][].
 2. Update version in [quickqwerty.html][] (two places).
 3. Update copyright in [quickqwerty.html][] (two places).
 4. Update copyright in [LICENSE.md][].
 5. Set `LOGGING = false` in [quickqwerty.html][].
 6. Update [CHANGES.md][].
 7. Run: the following commands:

    ```sh
    make checks
    git status
    git add -p

    VER=<VER>
    git commit -em "Set version to $VER"
    git tag $VER -m "QuickQWERTY $VER"
    git push origin main $VER

    git remote add cb https://codeberg.org/susam/quickqwerty.git
    git push cb --all
    git push cb --tags
    git push cb main:pages
    ```

[package.json]: package.json
[quickqwerty.html]: quickqwerty.html
[LICENSE.md]: LICENSE.md
[CHANGES.md]: CHANGES.md


Passages Used in the Tutor
--------------------------

### Cosmos by Carl Sagan

> All the elements of the Earth except hydrogen and some helium have been cooked by a kind of stellar alchemy billions of years ago in stars, some of which are today inconspicuous white dwarfs on the other side of the Milky Way Galaxy. The nitrogen in our DNA, the calcium in our teeth, the iron in our blood, the carbon in our apple pies were made in the interiors of collapsing stars. We are made of starstuff.

Reference: https://sgtscholar.wordpress.com/2019/12/18/the-winter-solstice-the-most-human-of-days/


### On Painting by Leon Battista Alberti

> The first thing to know is that a point is a sign which one might say is not divisible into parts. I call a sign anything which exists on a surface so that it is visible to the eye. No one will deny that things which are not visible do not concern the painter, for he strives to represent only the things that are seen.

Reference: https://pdfs.semanticscholar.org/2854/56eb39a51411fb8edda317732cc4153884a0.pdf


### Treasure Island

> I had crossed a marshy tract full of willows, bulrushes, and odd, outlandish, swampy trees; and I had now come out upon the skirts of an open piece of undulating, sandy country, about a mile long, dotted with a few pines, and a great number of contorted trees, not unlike the oak in growth, but pale in the foliage, like willows. On the far side of the open stood one of the hills, with two quaint, craggy peaks, shining vividly in the sun.

Reference: https://en.wikisource.org/wiki/Page%3AStevenson_-_Treasure_Island.djvu/124


### Hyperspace by Michio Kaku

> Some of the inspiration for Lewis Carroll's ideas most likely came from the great nineteenth-century German mathematician Georg Bernhard Riemann, who was the first to lay the mathematical foundation of geometries in higher-dimensional space. Riemann changed the course of mathematics for the next century by demonstrating that these universes, as strange as they may appear to the layperson, are completely self-consistent and obey their own inner logic.

Reference: https://core.ac.uk/download/pdf/228198974.pdf


### Relativity by Albert Einstein

> Lightning has struck the rails on our railway embankment at two places A and B far distant from each other. I make the additional assertion that these two lightning flashes occurred simultaneously. If I ask you whether there is sense in this statement, you will answer my question with a decided "Yes." But if I now approach you with the request to explain to me the sense of the statement more precisely, you find after some consideration that the answer to this question is not so easy as it appears at first sight.

Reference: https://www.marxists.org/reference/archive/einstein/works/1910s/relative/ch08.htm


### The Code Book by Simon Singh

> The next morning, Rivest handed the paper to Adleman, who went through his usual process of trying to tear it apart, but this time he could find no faults. His only criticism was with the list of authors. "I told Ron to take my name off the paper," recalls Adleman. "I told him that it was his invention, not mine. But Ron refused and we got into a discussion about it. We agreed that I would go home and contemplate it for one night, and consider what I wanted to do. I went back the next day and suggested to Ron that I be the third author. I recall thinking that this paper would be the least interesting paper that I will ever be on." Adleman could not have been more wrong. The system, dubbed RSA (Rivest, Shamir, Adleman) as opposed to ARS, went on to become the most influential cipher in modern cryptography.

Reference: https://www.goodreads.com/quotes/8516920-in-april-1977-rivest-shamir-and-adleman-spent-passover-at

Also: https://palmer.wellesley.edu/~ivolic/pdf/Classes/Handouts/NumberTheoryHandouts/PublicKeyHistory-Singh.pdf (page 273)
