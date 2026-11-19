// ✏️ THE MEMORY GALLERY — everything here is editable.
//
// How to use:
//  • Put photos in      public/images/photos/        (e.g. photo-01.jpg)
//  • Put screenshots in public/images/screenshots/   (e.g. chat-01.jpg)
//  • Each item's `src` is the path starting with "/images/...".
//  • Add / remove / reorder items by editing the arrays below.
//  • If a file is missing, a placeholder with its filename is shown instead.
//
// item = { type: 'photo' | 'screenshot', src, caption, alt?, note? }
//   `note` is extra text, used only by the 'highlight' layout.
//
// Layouts you can use in a section:
//   'scatter'     – loose collage of tilted Polaroids
//   'strip'       – horizontal swipeable strip
//   'stack'       – a pile; tap the top photo to flip to the next
//   'highlight'   – one big full-width moment
//   'cards'       – small floating picture cards
//   'screenshots' – chat screenshots (never cropped, tap to enlarge)

const photo = (n, caption, extra = {}) => ({
  type: 'photo',
  src: `/images/photos/photo-${String(n).padStart(2, '0')}.jpg`,
  caption,
  ...extra,
})

const chat = (n, caption, extra = {}) => ({
  type: 'screenshot',
  src: `/images/screenshots/chat-${String(n).padStart(2, '0')}.png`,
  caption,
  ...extra,
})

export const gallery = {
  heading: 'Our little world',
  chapters: [
    {
      id: 'beginning',
      label: 'Chapter A',
      name: 'The Beginning',
      heading: 'Who knew a random beginning would turn into this?',
      sections: [
        {
          layout: 'scatter',
          items: [
            photo(1, 'And this is where our story started.'),
            photo(2, 'Little did I know...'),
            chat(1, 'The beginning of something unexpectedly special.'),
          ],
        },
        {
          layout: 'highlight',
          items: [
            photo(3, 'The beginning of something unexpectedly special.', {
              // note: 'Write a line here about what this moment means to you.',
            }),
          ],
        },
      ],
    },
    {
      id: 'chaos',
      label: 'Chapter B',
      name: 'The Chaos',
      heading: 'Because our conversations deserve their own award.',
      sections: [
        {
          layout: 'screenshots',
          items: [
            chat(2, 'Normal conversations? Never heard of them.'),
            chat(3, 'Proof that we can talk about absolutely anything.'),
            chat(4, 'Some screenshots are better left unexplained.'),
          ],
        },
        {
          layout: 'strip',
          items: [
            photo(4, 'Normal conversations? Never heard of them.'),
            photo(5, 'Proof that we can talk about absolutely anything.'),
            photo(6, 'Some screenshots are better left unexplained.'),
            photo(7, 'Chaos, but make it cute.'),
          ],
        },
      ],
    },
    {
      id: 'appreciation',
      label: 'Chapter C',
      name: 'The Appreciation',
      heading: "Behind all the jokes, there's a lot of gratitude.",
      sections: [
        {
          layout: 'stack',
          items: [
            photo(8, 'One of my favourite unexpected people.'),
            photo(9, 'Always grateful for this friendship.'),
            photo(10, 'A genuinely good human being.'),
          ],
        },
        {
          layout: 'cards',
          items: [
            photo(11, 'Always grateful.'),
            photo(12, 'Good people exist.'),
            photo(13, 'More chapters to come.'),
          ],
        },
      ],
    },
  ],
  button: 'On to the last few notes →',
}
