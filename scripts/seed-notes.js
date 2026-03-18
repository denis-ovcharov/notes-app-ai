const categories = [
  'Todo',
  'Work',
  'Personal',
  'Travel',
  'Ideas',
  'Shopping',
  'Health',
  'Finance',
];

const noteTemplates = [
  { title: 'Morning Routine', content: 'Wake up at 6 AM, meditate for 10 minutes, exercise, healthy breakfast, review daily goals.', category: 'Personal' },
  { title: 'Project Deadline', content: 'Complete the Q1 report by Friday. Include sales metrics, team performance, and projections for next quarter.', category: 'Work' },
  { title: 'Grocery List', content: 'Milk, eggs, bread, chicken breast, rice, vegetables (broccoli, carrots, spinach), fruits (apples, bananas, berries).', category: 'Shopping' },
  { title: 'Vacation Planning', content: 'Research flights to Japan. Check visa requirements. Book accommodation in Tokyo and Kyoto. Plan itinerary for 2 weeks.', category: 'Travel' },
  { title: 'App Feature Ideas', content: 'Dark mode toggle, offline sync, voice notes, collaborative editing, AI-powered summarization, tags system.', category: 'Ideas' },
  { title: 'Budget Review', content: 'Monthly expenses: Rent $1200, Utilities $150, Groceries $400, Transportation $200, Entertainment $150. Target savings: 30%.', category: 'Finance' },
  { title: 'Workout Plan', content: 'Monday: Chest & Triceps, Tuesday: Back & Biceps, Wednesday: Rest, Thursday: Legs, Friday: Shoulders, Weekend: Cardio.', category: 'Health' },
  { title: 'Weekly Tasks', content: 'Finish presentation, call insurance company, schedule dentist appointment, pay electricity bill, organize garage.', category: 'Todo' },
  { title: 'Meeting Notes', content: 'Team sync: Discussed sprint goals, blockers identified in API integration, need to coordinate with design team on new mockups.', category: 'Work' },
  { title: 'Books to Read', content: 'Atomic Habits by James Clear, Deep Work by Cal Newport, The Psychology of Money by Morgan Housel.', category: 'Personal' },
  { title: 'Home Renovation', content: 'Kitchen: new countertops, repaint cabinets. Bathroom: fix leaky faucet, re-grout tiles. Living room: new lighting fixtures.', category: 'Ideas' },
  { title: 'Investment Research', content: 'Look into index funds (VTI, VOO). Consider maxing out Roth IRA. Research dividend stocks for passive income.', category: 'Finance' },
  { title: 'Meal Prep Sunday', content: 'Grill chicken breasts, cook quinoa, chop vegetables, prepare overnight oats, portion out snacks for the week.', category: 'Health' },
  { title: 'Birthday Gift Ideas', content: 'Mom: spa day voucher. Dad: wireless earbuds. Sister: cookbook. Brother: gaming headset. Best friend: concert tickets.', category: 'Shopping' },
  { title: 'Road Trip Route', content: 'Day 1: Drive to Denver, explore downtown. Day 2: Rocky Mountain NP. Day 3: Continue to Salt Lake City. Day 4: Arrive in Seattle.', category: 'Travel' },
  { title: 'Learn Spanish', content: 'Duolingo daily practice, watch Spanish shows with subtitles, language exchange meetup on Saturdays, hire tutor for conversation practice.', category: 'Personal' },
  { title: 'Side Project', content: 'Build a habit tracker app. Features: streak counter, reminders, statistics dashboard, social sharing. Tech stack: React Native + Firebase.', category: 'Ideas' },
  { title: 'Tax Documents', content: 'Gather W-2 forms, 1099s, charitable donation receipts, medical expense records, mortgage interest statement. Schedule CPA appointment.', category: 'Finance' },
  { title: 'Dental Care', content: 'Schedule cleaning every 6 months. Floss daily. Use electric toothbrush. Replace brush head quarterly. Limit sugary drinks.', category: 'Health' },
  { title: 'Car Maintenance', content: 'Oil change every 5000 miles. Rotate tires. Check brake pads. Replace air filter. Top up fluids. Annual inspection due next month.', category: 'Todo' },
  { title: 'Conference Presentation', content: 'Topic: Modern Web Performance. Outline: Core Web Vitals, optimization techniques, real-world case studies, Q&A preparation.', category: 'Work' },
  { title: 'Weekend Plans', content: 'Saturday: farmers market, lunch with friends, movie night. Sunday: gym, meal prep, catch up on reading, early bedtime.', category: 'Personal' },
  { title: 'Camping Gear', content: 'Tent (4-person), sleeping bags, camping stove, cooler, lantern, first aid kit, portable charger, hiking boots.', category: 'Shopping' },
  { title: 'Europe Itinerary', content: 'London (3 days) → Paris (4 days) → Amsterdam (2 days) → Berlin (3 days) → Prague (2 days). Book Eurail pass.', category: 'Travel' },
  { title: 'YouTube Channel', content: 'Niche: productivity & tech. Content calendar: 2 videos/week. Invest in better mic and lighting. Collaborate with other creators.', category: 'Ideas' },
  { title: 'Emergency Fund', content: 'Target: 6 months expenses ($30,000). Current: $18,000. Auto-transfer $500/month to high-yield savings account.', category: 'Finance' },
  { title: 'Running Goals', content: '5K in under 25 minutes. Train 4x/week. Increase long run distance by 10% weekly. Sign up for local race in 2 months.', category: 'Health' },
  { title: 'Home Organization', content: 'Declutter closet (donate unused clothes). Organize digital files. Clean out email inbox. Set up filing system for documents.', category: 'Todo' },
  { title: 'Code Review Checklist', content: 'Check for: proper error handling, input validation, consistent naming, adequate tests, documentation, performance considerations.', category: 'Work' },
  { title: 'Self-Care Sunday', content: 'Face mask, bubble bath, journaling, gentle yoga, herbal tea, no screens after 8 PM, early bedtime with good book.', category: 'Personal' },
  { title: 'Tech Upgrades', content: 'New laptop (M3 MacBook Pro), mechanical keyboard, 4K monitor, ergonomic chair, noise-canceling headphones.', category: 'Shopping' },
  { title: 'Beach Vacation', content: 'Pack: swimsuits, sunscreen, beach towels, sunglasses, hat, sandals, beach reads. Book oceanfront Airbnb.', category: 'Travel' },
  { title: 'Podcast Ideas', content: 'Interview local entrepreneurs, discuss industry trends, solo episodes on productivity tips, listener Q&A sessions.', category: 'Ideas' },
  { title: 'Retirement Planning', content: 'Max out 401k contribution ($22,500). Consider backdoor Roth IRA. Review beneficiary designations. Rebalance portfolio annually.', category: 'Finance' },
  { title: 'Mental Health', content: 'Daily meditation (10 min), therapy sessions bi-weekly, gratitude journaling, limit social media, maintain sleep schedule.', category: 'Health' },
  { title: 'Pet Care Tasks', content: 'Vet appointment for vaccination, buy new dog food, schedule grooming, replace worn toys, update microchip info.', category: 'Todo' },
  { title: 'Performance Review Prep', content: 'Document achievements from past year. Gather feedback from colleagues. Prepare goals for next year. Research salary benchmarks.', category: 'Work' },
  { title: 'Language Learning Goals', content: 'Reach B2 level in French by December. Practice speaking 3x/week. Read French news daily. Watch French films weekly.', category: 'Personal' },
  { title: 'Office Supplies', content: 'Notebooks, pens, sticky notes, file folders, desk organizer, whiteboard, markers, printer paper, ink cartridges.', category: 'Shopping' },
  { title: 'Ski Trip Planning', content: 'Book cabin in Aspen. Rent ski equipment. Buy lift tickets in advance. Pack thermal layers, goggles, gloves. Check weather forecast.', category: 'Travel' },
];

async function seedNotes() {
  const API_URL = 'http://localhost:3000/api/notes';
  
  console.log('Starting to seed 40 notes...\n');
  
  let successCount = 0;
  let failCount = 0;
  
  for (let i = 0; i < noteTemplates.length; i++) {
    const note = noteTemplates[i];
    
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(note),
      });
      
      if (response.ok) {
        successCount++;
        console.log(`✓ Created: ${note.title}`);
      } else {
        failCount++;
        console.log(`✗ Failed: ${note.title}`);
      }
    } catch (error) {
      failCount++;
      console.log(`✗ Error: ${note.title} - ${error.message}`);
    }
  }
  
  console.log(`\n========================================`);
  console.log(`Seeding complete!`);
  console.log(`Successful: ${successCount}`);
  console.log(`Failed: ${failCount}`);
  console.log(`========================================`);
}

seedNotes();
