const loveItems = [
  {
    id: 1,
    category: "personality",
    title: "Kindness",
    description: "Your kindness and empathy towards others is a blessing. Not just to them, but to everyone around you."
  },
  {
    id: 2,
    category: "details",
    title: "Your smile",
    description: "I just love seeing your smile. It brings me so much joy and happiness."
  },
  {
    id: 3,
    category: "memories",
    title: "Our late evening car rides",
    description: "I just love our late evening car rides around the campus. It is a time when we can just be ourselves and enjoy each other's company."
  },
  {
    id: 4,
    category: "future",
    title: "Your dedication",
    description: "I love how you are dedicated to your goals and dreams. You work hard and never give up."
  },
  {
    id: 5,
    category: "personality",
    title: "Your care",
    description: "Your caring nature to always adhere to your friends and family when they need you, without even asking truly makes you special."
  },
  {
    id: 6,
    category: "details",
    title: "Your empathy",
    description: "Your cognitive ability to understand your family and friends, how they are feeling. You always know how to cheer them up."
  },
  {
    id: 7,
    category: "memories",
    title: "Our evening walks",
    description: "Our evening walks that started years ago and spanned parks, tennis courts, the gym, the campus, and more. With no reason other than just to walk and enjoy each other's company, that is life."
  },
  {
    id: 8,
    category: "future",
    title: "Fitness",
    description: "Your promise to fitness and getting up everyday, no matter how the mood, and giving time to the temple that is your body."
  },
  {
    id: 9,
    category: "personality",
    title: "Your Fashion",
    description: "Your sense of fashion is more top-notch than even most magazines! Please tell us how you make your choices. You truly are a DIVA."
  },
  {
    id: 10,
    category: "details",
    title: "Your cooking knowledge",
    description: "Your immense knowledge on delicious and a huge variety of cooking, and the ability to make any dish you/me are craving!"
  },
  {
    id: 11,
    category: "memories",
    title: "Our coding nights",
    description: "Our lovely time when we code, whiteboard, study and grow together and be stronger together and ready for challenges."
  },
  {
    id: 12,
    category: "future",
    title: "Your decision making insight",
    description: "Your hunch and insights are always the way to go!"
  },
  {
    id: 13,
    category: "personality",
    title: "Your forgiveness",
    description: "Your nature of accepting me and forgiving me when I am wrong and allowing me to grow with you and become better for you."
  },
  {
    id: 14,
    category: "details",
    title: "Your love for traveling",
    description: "Your 'always ready to travel' nature has taken us to so many meaningful and enjoyable journeys in life. You have turned me from a stay-home to a go-out person and I never look back!"
  },
  {
    id: 15,
    category: "memories",
    title: "Our TV drama times",
    description: "The times dedicated solely to watching some new drama - be it any language, that's not stopping us. Pair this with some snack and ice cream."
  },
  {
    id: 16,
    category: "future",
    title: "Dedication to work and learning",
    description: "You are always a student. With your strong background, involvement in tech communities, and learning personality, you are crushing it."
  },
  {
    id: 17,
    category: "personality",
    title: "Your uncrushable personality",
    description: "No body at all can tell you what to do. You stand up for yourself and don't let nobody make decisions for you or boss you around."
  },
  {
    id: 18,
    category: "details",
    title: "Your music taste",
    description: "That's how we started, by bonding over tunes of love and compassion, sending each other hidden parcels of love."
  },
  {
    id: 19,
    category: "memories",
    title: "Our boba dates",
    description: "Our yummy boba dates around the world where it's just me you, those refreshing fruity sips, some photos, and some board games."
  },
  {
    id: 20,
    category: "future",
    title: "Your strong financial knowledge",
    description: "Your strong financial knowledge and interests, and your 'always exploring' nature helps us be stronger and ready for anything."
  },
  {
    id: 21,
    category: "personality",
    title: "Your motherly nature",
    description: "Your unconditional motherly love and care to all your little ones."
  },
  {
    id: 22,
    category: "details",
    title: "Your eyes",
    description: "Your gorgeous eyes really are made from the stars with extravagant, heavenly beauty that has captured my heart and hypnotized me."
  },
  {
    id: 23,
    category: "memories",
    title: "Our walks in the park",
    description: "Our afternoon walks in the park. Be it spring, summer or fall, getting a breath of fresh air with you, swinging, cycling, is a pleasure."
  },
  {
    id: 24,
    category: "future",
    title: "Your patience",
    description: "Your patience, and knowing when to make the moves helps us in finance, education, work, and family."
  },
  {
    id: 25,
    category: "personality",
    title: "Your comedy",
    description: "You always make me laugh and it's like a breath of fresh air and completely uplifts the mood. Masti shouldn't stop."
  },
  {
    id: 26,
    category: "details",
    title: "Your hair",
    description: "Your beautiful, silky, soft, reshmi hair that looks straight out of shampoo commercials."
  },
  {
    id: 27,
    category: "memories",
    title: "Our cafe dates",
    description: "Going to cafes around the world, sipping on coffees, teas, matcha, juice, while enjoying the view and conversation. It couldn't be better."
  },
  {
    id: 28,
    category: "future",
    title: "Your goals",
    description: "Your goals of having, loving and nurturing a nice home in a nice city with a loving family around perfectly matches mine."
  },
  {
    id: 29,
    category: "personality",
    title: "Your high spirit",
    description: "You always stand face up no matter the circumstances. That is how it should be and nothing can stop you."
  },
  {
    id: 30,
    category: "details",
    title: "Your curves",
    description: "Cannot keep my eyes away from your curves."
  },
  {
    id: 31,
    category: "memories",
    title: "The Farmer's market",
    description: "Waking up early on Saturdays to dress nice, get some iced coffee and donuts with you is truly a blessing."
  },
  {
    id: 32,
    category: "future",
    title: "Your career aspirations",
    description: "Your goal of continuously becoming better at what you do, improving connections, gaining valuable skills and knowledge is extremely motivational."
  },
  {
    id: 33,
    category: "personality",
    title: "Your support",
    description: "Your unconditional, unstoppable, unmeasurable, unbeatable support to me, your family and friends is a pillar of strength in our lives."
  },
  {
    id: 34,
    category: "details",
    title: "Your originality",
    description: "You are you and ain't nobody like you. You are you and I love you."
  },
  {
    id: 35,
    category: "memories",
    title: "Our time at Grand Canyon",
    description: "Our wonderful trip to Grand Canyon and Vegas was filled with beautiful skies, scenic desert, serene drives and unforgettable memories."
  },
  {
    id: 36,
    category: "future",
    title: "Your guidance",
    description: "Your subtle but powerful daily guidance in my life is keeping me in the right direction and focused."
  },
  {
    id: 37,
    category: "personality",
    title: "Your masti personality",
    description: "Masti should never stop no matter the circumstances. This attitude of yours is a blessing."
  },
  {
    id: 38,
    category: "details",
    title: "Your attention to details",
    description: "When you do something, you put 100% of your mind, dedication and focus to it which is why it turns out so great."
  },
  {
    id: 39,
    category: "memories",
    title: "Our dance sessions",
    description: "Our never ending, varied dance practice sessions. Practicing for baby showers, rice feeding, birthdays, weddings and more is always fun with you."
  },
  {
    id: 40,
    category: "future",
    title: "Your promise to your health",
    description: "Your promise to eating clean, staying hydrated, working out, and healthy habits motivates you, me and your friends and family towards a strong lifestyle."
  },
  {
    id: 41,
    category: "personality",
    title: "Your food cravings",
    description: "Thanks to your food cravings we both get to enjoy delicious (but healthy) exotic foods ranging from east to west."
  },
  {
    id: 42,
    category: "details",
    title: "Your spirituality",
    description: "Your relationship to destiny, karma, and the universe."
  },
  {
    id: 43,
    category: "memories",
    title: "Our ice cream dates",
    description: "Our ice cream dates that range from driving-thru, eating in parking lots, dining-in with family, or bringing it home for a movie or drama."
  },
  {
    id: 44,
    category: "future",
    title: "Your investment knowledge",
    description: "Your knowledge on investing, diversifying stock shares, and continual financial learning."
  },
  {
    id: 45,
    category: "personality",
    title: "Your humility",
    description: "You have come a long way and grown stronger and improved to an unmeasurable extent. Yet you remain humble and never forget your roots."
  },
  {
    id: 46,
    category: "details",
    title: "Your manifestation",
    description: "Your manifest everything you truly deserve, not just for yourself but also for your family and friends and I have felt this personally."
  },
  {
    id: 47,
    category: "memories",
    title: "Our piano times",
    description: "Us playing piano together, be that in the campus laundry room, the Brandt hall, or at a random airport."
  },
  {
    id: 48,
    category: "future",
    title: "Your research capabilities",
    description: "Your unmatched ability to research trends and guide us in the right direction, be that finance, travel, events, or family decisions."
  },
  {
    id: 49,
    category: "personality",
    title: "Your love of trying new styles",
    description: "Trying new hairstyles, new skincare, new colognes, new outfits. We are never bored!"
  },
  {
    id: 50,
    category: "details",
    title: "You in traditional kurti",
    description: "Your dreamy, gorgeous beauty, paired with the traditional outfits, puts butterflies in my stomach."
  },
  {
    id: 51,
    category: "memories",
    title: "The hammock",
    description: "Nothing needs to be said here. That cold October night on the hammock, which was so silent yet so magical. That night changed everything."
  },
  {
    id: 52,
    category: "future",
    title: "Reason 52",
    description: "Type your personal reason here..."
  },
  {
    id: 53,
    category: "personality",
    title: "Reason 53",
    description: "Type your personal reason here..."
  },
  {
    id: 54,
    category: "details",
    title: "Reason 54",
    description: "Type your personal reason here..."
  },
  {
    id: 55,
    category: "memories",
    title: "Our karaoke fun",
    description: "Type your personal reason here..."
  },
  {
    id: 56,
    category: "future",
    title: "Reason 56",
    description: "Type your personal reason here..."
  },
  {
    id: 57,
    category: "personality",
    title: "Reason 57",
    description: "Type your personal reason here..."
  },
  {
    id: 58,
    category: "details",
    title: "Reason 58",
    description: "Type your personal reason here..."
  },
  {
    id: 59,
    category: "memories",
    title: "Our momo nights",
    description: "Type your personal reason here..."
  },
  {
    id: 60,
    category: "future",
    title: "Reason 60",
    description: "Type your personal reason here..."
  },
  {
    id: 61,
    category: "personality",
    title: "Reason 61",
    description: "Type your personal reason here..."
  },
  {
    id: 62,
    category: "details",
    title: "Reason 62",
    description: "Type your personal reason here..."
  },
  {
    id: 63,
    category: "memories",
    title: "Reason 63",
    description: "Type your personal reason here..."
  },
  {
    id: 64,
    category: "future",
    title: "Reason 64",
    description: "Type your personal reason here..."
  },
  {
    id: 65,
    category: "personality",
    title: "Reason 65",
    description: "Type your personal reason here..."
  },
  {
    id: 66,
    category: "details",
    title: "Reason 66",
    description: "Type your personal reason here..."
  },
  {
    id: 67,
    category: "memories",
    title: "Reason 67",
    description: "Type your personal reason here..."
  },
  {
    id: 68,
    category: "future",
    title: "Reason 68",
    description: "Type your personal reason here..."
  },
  {
    id: 69,
    category: "personality",
    title: "Reason 69",
    description: "Type your personal reason here..."
  },
  {
    id: 70,
    category: "details",
    title: "Reason 70",
    description: "Type your personal reason here..."
  },
  {
    id: 71,
    category: "memories",
    title: "Reason 71",
    description: "Type your personal reason here..."
  },
  {
    id: 72,
    category: "future",
    title: "Reason 72",
    description: "Type your personal reason here..."
  },
  {
    id: 73,
    category: "personality",
    title: "Reason 73",
    description: "Type your personal reason here..."
  },
  {
    id: 74,
    category: "details",
    title: "Reason 74",
    description: "Type your personal reason here..."
  },
  {
    id: 75,
    category: "memories",
    title: "Reason 75",
    description: "Type your personal reason here..."
  },
  {
    id: 76,
    category: "future",
    title: "Reason 76",
    description: "Type your personal reason here..."
  },
  {
    id: 77,
    category: "personality",
    title: "Reason 77",
    description: "Type your personal reason here..."
  },
  {
    id: 78,
    category: "details",
    title: "Reason 78",
    description: "Type your personal reason here..."
  },
  {
    id: 79,
    category: "memories",
    title: "Reason 79",
    description: "Type your personal reason here..."
  },
  {
    id: 80,
    category: "future",
    title: "Reason 80",
    description: "Type your personal reason here..."
  },
  {
    id: 81,
    category: "personality",
    title: "Reason 81",
    description: "Type your personal reason here..."
  },
  {
    id: 82,
    category: "details",
    title: "Reason 82",
    description: "Type your personal reason here..."
  },
  {
    id: 83,
    category: "memories",
    title: "Reason 83",
    description: "Type your personal reason here..."
  },
  {
    id: 84,
    category: "future",
    title: "Reason 84",
    description: "Type your personal reason here..."
  },
  {
    id: 85,
    category: "personality",
    title: "Reason 85",
    description: "Type your personal reason here..."
  },
  {
    id: 86,
    category: "details",
    title: "Reason 86",
    description: "Type your personal reason here..."
  },
  {
    id: 87,
    category: "memories",
    title: "Reason 87",
    description: "Type your personal reason here..."
  },
  {
    id: 88,
    category: "future",
    title: "Reason 88",
    description: "Type your personal reason here..."
  },
  {
    id: 89,
    category: "personality",
    title: "Reason 89",
    description: "Type your personal reason here..."
  },
  {
    id: 90,
    category: "details",
    title: "Reason 90",
    description: "Type your personal reason here..."
  },
  {
    id: 91,
    category: "memories",
    title: "Reason 91",
    description: "Type your personal reason here..."
  },
  {
    id: 92,
    category: "future",
    title: "Reason 92",
    description: "Type your personal reason here..."
  },
  {
    id: 93,
    category: "personality",
    title: "Reason 93",
    description: "Type your personal reason here..."
  },
  {
    id: 94,
    category: "details",
    title: "Reason 94",
    description: "Type your personal reason here..."
  },
  {
    id: 95,
    category: "memories",
    title: "Reason 95",
    description: "Type your personal reason here..."
  },
  {
    id: 96,
    category: "future",
    title: "Reason 96",
    description: "Type your personal reason here..."
  },
  {
    id: 97,
    category: "personality",
    title: "Reason 97",
    description: "Type your personal reason here..."
  },
  {
    id: 98,
    category: "details",
    title: "Reason 98",
    description: "Type your personal reason here..."
  },
  {
    id: 99,
    category: "memories",
    title: "Reason 99",
    description: "Type your personal reason here..."
  },
  {
    id: 100,
    category: "future",
    title: "Reason 100",
    description: "Type your personal reason here..."
  },
  {
    id: 101,
    category: "personality",
    title: "Reason 101",
    description: "Type your personal reason here..."
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = loveItems;
}
