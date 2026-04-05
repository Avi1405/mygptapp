const matches = [
  { id: 1, utcKickoff: '2026-06-11T18:00:00Z', stage: 'Group A', homeTeam: 'Mexico', awayTeam: 'Japan', stadium: 'Estadio Azteca', city: 'Mexico City' },
  { id: 2, utcKickoff: '2026-06-12T01:00:00Z', stage: 'Group B', homeTeam: 'United States', awayTeam: 'Ghana', stadium: 'SoFi Stadium', city: 'Los Angeles' },
  { id: 3, utcKickoff: '2026-06-12T16:00:00Z', stage: 'Group C', homeTeam: 'England', awayTeam: 'Serbia', stadium: 'MetLife Stadium', city: 'New York/New Jersey' },
  { id: 4, utcKickoff: '2026-06-13T20:00:00Z', stage: 'Group D', homeTeam: 'France', awayTeam: 'Canada', stadium: 'BC Place', city: 'Vancouver' },
  { id: 5, utcKickoff: '2026-06-14T18:00:00Z', stage: 'Group E', homeTeam: 'Brazil', awayTeam: 'Croatia', stadium: 'AT&T Stadium', city: 'Dallas' },
  { id: 6, utcKickoff: '2026-06-14T23:00:00Z', stage: 'Group F', homeTeam: 'Argentina', awayTeam: 'Morocco', stadium: 'Hard Rock Stadium', city: 'Miami' },
  { id: 7, utcKickoff: '2026-06-15T19:00:00Z', stage: 'Group G', homeTeam: 'Germany', awayTeam: 'South Korea', stadium: 'Lumen Field', city: 'Seattle' },
  { id: 8, utcKickoff: '2026-06-16T02:00:00Z', stage: 'Group H', homeTeam: 'Spain', awayTeam: 'Australia', stadium: 'NRG Stadium', city: 'Houston' },
  { id: 9, utcKickoff: '2026-06-16T19:00:00Z', stage: 'Group I', homeTeam: 'Portugal', awayTeam: 'Uruguay', stadium: 'Levi’s Stadium', city: 'San Francisco Bay Area' },
  { id: 10, utcKickoff: '2026-06-17T00:00:00Z', stage: 'Group J', homeTeam: 'Netherlands', awayTeam: 'United States', stadium: 'Mercedes-Benz Stadium', city: 'Atlanta' },
  { id: 11, utcKickoff: '2026-06-17T18:00:00Z', stage: 'Group K', homeTeam: 'Belgium', awayTeam: 'Denmark', stadium: 'Arrowhead Stadium', city: 'Kansas City' },
  { id: 12, utcKickoff: '2026-06-18T01:00:00Z', stage: 'Group L', homeTeam: 'Italy', awayTeam: 'Switzerland', stadium: 'BMO Field', city: 'Toronto' },
  { id: 13, utcKickoff: '2026-06-19T19:00:00Z', stage: 'Group A', homeTeam: 'Japan', awayTeam: 'Canada', stadium: 'BC Place', city: 'Vancouver' },
  { id: 14, utcKickoff: '2026-06-20T18:00:00Z', stage: 'Group B', homeTeam: 'Ghana', awayTeam: 'Mexico', stadium: 'Estadio BBVA', city: 'Monterrey' },
  { id: 15, utcKickoff: '2026-06-21T22:00:00Z', stage: 'Group C', homeTeam: 'England', awayTeam: 'Australia', stadium: 'Lincoln Financial Field', city: 'Philadelphia' },
  { id: 16, utcKickoff: '2026-06-22T02:00:00Z', stage: 'Group D', homeTeam: 'France', awayTeam: 'Croatia', stadium: 'Gillette Stadium', city: 'Boston' },
  { id: 17, utcKickoff: '2026-06-23T23:00:00Z', stage: 'Group E', homeTeam: 'Brazil', awayTeam: 'Portugal', stadium: 'Estadio Akron', city: 'Guadalajara' },
  { id: 18, utcKickoff: '2026-06-24T19:00:00Z', stage: 'Group F', homeTeam: 'Argentina', awayTeam: 'Spain', stadium: 'Rose Bowl Stadium', city: 'Los Angeles' },
  { id: 19, utcKickoff: '2026-06-28T20:00:00Z', stage: 'Round of 32', homeTeam: 'A1', awayTeam: 'B3', stadium: 'SoFi Stadium', city: 'Los Angeles' },
  { id: 20, utcKickoff: '2026-06-29T00:00:00Z', stage: 'Round of 32', homeTeam: 'C1', awayTeam: 'D3', stadium: 'NRG Stadium', city: 'Houston' },
  { id: 21, utcKickoff: '2026-06-29T19:00:00Z', stage: 'Round of 32', homeTeam: 'E1', awayTeam: 'F3', stadium: 'AT&T Stadium', city: 'Dallas' },
  { id: 22, utcKickoff: '2026-06-30T01:00:00Z', stage: 'Round of 32', homeTeam: 'G1', awayTeam: 'H3', stadium: 'Hard Rock Stadium', city: 'Miami' },
  { id: 23, utcKickoff: '2026-06-30T20:00:00Z', stage: 'Round of 32', homeTeam: 'I1', awayTeam: 'J2', stadium: 'Levi’s Stadium', city: 'San Francisco Bay Area' },
  { id: 24, utcKickoff: '2026-07-01T00:00:00Z', stage: 'Round of 32', homeTeam: 'K1', awayTeam: 'L2', stadium: 'MetLife Stadium', city: 'New York/New Jersey' },
  { id: 25, utcKickoff: '2026-07-02T19:00:00Z', stage: 'Round of 16', homeTeam: 'W49', awayTeam: 'W50', stadium: 'Mercedes-Benz Stadium', city: 'Atlanta' },
  { id: 26, utcKickoff: '2026-07-03T00:00:00Z', stage: 'Round of 16', homeTeam: 'W51', awayTeam: 'W52', stadium: 'Lumen Field', city: 'Seattle' },
  { id: 27, utcKickoff: '2026-07-03T19:00:00Z', stage: 'Round of 16', homeTeam: 'W53', awayTeam: 'W54', stadium: 'Lincoln Financial Field', city: 'Philadelphia' },
  { id: 28, utcKickoff: '2026-07-04T00:00:00Z', stage: 'Round of 16', homeTeam: 'W55', awayTeam: 'W56', stadium: 'Estadio Azteca', city: 'Mexico City' },
  { id: 29, utcKickoff: '2026-07-06T20:00:00Z', stage: 'Quarterfinal', homeTeam: 'W57', awayTeam: 'W58', stadium: 'Gillette Stadium', city: 'Boston' },
  { id: 30, utcKickoff: '2026-07-07T00:00:00Z', stage: 'Quarterfinal', homeTeam: 'W59', awayTeam: 'W60', stadium: 'Arrowhead Stadium', city: 'Kansas City' },
  { id: 31, utcKickoff: '2026-07-07T20:00:00Z', stage: 'Quarterfinal', homeTeam: 'W61', awayTeam: 'W62', stadium: 'Estadio BBVA', city: 'Monterrey' },
  { id: 32, utcKickoff: '2026-07-08T00:00:00Z', stage: 'Quarterfinal', homeTeam: 'W63', awayTeam: 'W64', stadium: 'BMO Field', city: 'Toronto' },
  { id: 33, utcKickoff: '2026-07-14T19:00:00Z', stage: 'Semifinal', homeTeam: 'W65', awayTeam: 'W66', stadium: 'AT&T Stadium', city: 'Dallas' },
  { id: 34, utcKickoff: '2026-07-15T19:00:00Z', stage: 'Semifinal', homeTeam: 'W67', awayTeam: 'W68', stadium: 'Mercedes-Benz Stadium', city: 'Atlanta' },
  { id: 35, utcKickoff: '2026-07-18T20:00:00Z', stage: 'Third-place match', homeTeam: 'L69', awayTeam: 'L70', stadium: 'Hard Rock Stadium', city: 'Miami' },
  { id: 36, utcKickoff: '2026-07-19T19:00:00Z', stage: 'Final', homeTeam: 'W69', awayTeam: 'W70', stadium: 'MetLife Stadium', city: 'New York/New Jersey' }
];

const countryCodeByTeam = {
  A1: 'UN',
  A2: 'UN',
  A3: 'UN',
  Argentina: 'AR',
  Australia: 'AU',
  B3: 'UN',
  Belgium: 'BE',
  Brazil: 'BR',
  C1: 'UN',
  Canada: 'CA',
  Croatia: 'HR',
  D3: 'UN',
  Denmark: 'DK',
  E1: 'UN',
  England: 'GB',
  F3: 'UN',
  France: 'FR',
  G1: 'UN',
  Ghana: 'GH',
  H3: 'UN',
  I1: 'UN',
  Italy: 'IT',
  J2: 'UN',
  Japan: 'JP',
  K1: 'UN',
  L2: 'UN',
  Mexico: 'MX',
  Morocco: 'MA',
  Netherlands: 'NL',
  Portugal: 'PT',
  Serbia: 'RS',
  'South Korea': 'KR',
  Spain: 'ES',
  Switzerland: 'CH',
  'United States': 'US',
  Uruguay: 'UY',
  W49: 'UN',
  W50: 'UN',
  W51: 'UN',
  W52: 'UN',
  W53: 'UN',
  W54: 'UN',
  W55: 'UN',
  W56: 'UN',
  W57: 'UN',
  W58: 'UN',
  W59: 'UN',
  W60: 'UN',
  W61: 'UN',
  W62: 'UN',
  W63: 'UN',
  W64: 'UN',
  W65: 'UN',
  W66: 'UN',
  W67: 'UN',
  W68: 'UN',
  W69: 'UN',
  W70: 'UN',
  L69: 'UN',
  L70: 'UN'
};

const countryFilter = document.getElementById('country-filter');
const scheduleList = document.getElementById('schedule-list');
const scheduleEmpty = document.getElementById('schedule-empty');

function toFlagEmoji(code) {
  if (!code || code === 'UN') return '🏳️';
  return code
    .toUpperCase()
    .split('')
    .map((char) => String.fromCodePoint(127397 + char.charCodeAt()))
    .join('');
}

function getTeamLabel(team) {
  const flag = toFlagEmoji(countryCodeByTeam[team]);
  return `${flag} ${team}`;
}

function isCountryTeam(team) {
  return countryCodeByTeam[team] && countryCodeByTeam[team] !== 'UN';
}

function getLocalKickoff(utcString) {
  const date = new Date(utcString);
  return date.toLocaleString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });
}

function buildMatchCard(match) {
  const article = document.createElement('article');
  article.className = 'match-card';

  article.innerHTML = `
    <h3 class="match-title">${getTeamLabel(match.homeTeam)} vs ${getTeamLabel(match.awayTeam)}</h3>
    <p class="match-meta"><strong>Stage:</strong> ${match.stage}</p>
    <p class="match-meta"><strong>Venue:</strong> ${match.stadium}, ${match.city}</p>
    <p class="match-kickoff">Kickoff: ${getLocalKickoff(match.utcKickoff)}</p>
  `;

  return article;
}

function renderSchedule() {
  const selected = countryFilter.value;
  const filtered =
    selected === 'all'
      ? matches
      : matches.filter((match) => match.homeTeam === selected || match.awayTeam === selected);

  scheduleList.innerHTML = '';
  if (!filtered.length) {
    scheduleEmpty.hidden = false;
    return;
  }

  scheduleEmpty.hidden = true;
  filtered.forEach((match) => scheduleList.appendChild(buildMatchCard(match)));
}

function buildCountryFilter() {
  const teams = new Set();
  matches.forEach((match) => {
    if (isCountryTeam(match.homeTeam)) teams.add(match.homeTeam);
    if (isCountryTeam(match.awayTeam)) teams.add(match.awayTeam);
  });

  [...teams].sort().forEach((team) => {
    const option = document.createElement('option');
    option.value = team;
    option.textContent = getTeamLabel(team);
    countryFilter.appendChild(option);
  });
}

function setupSeoSportsEvents() {
  const featured = matches.slice(0, 6).map((match) => ({
    '@type': 'SportsEvent',
    name: `${match.homeTeam} vs ${match.awayTeam}`,
    startDate: match.utcKickoff,
    location: {
      '@type': 'Place',
      name: match.stadium,
      address: {
        '@type': 'PostalAddress',
        addressLocality: match.city,
        addressCountry: 'US'
      }
    },
    competitor: [
      { '@type': 'SportsTeam', name: match.homeTeam },
      { '@type': 'SportsTeam', name: match.awayTeam }
    ],
    sport: 'Soccer'
  }));

  const payload = {
    '@context': 'https://schema.org',
    '@graph': featured
  };

  document.getElementById('sports-events-jsonld').textContent = JSON.stringify(payload);
}

function init() {
  buildCountryFilter();
  setupSeoSportsEvents();

  countryFilter.addEventListener('change', renderSchedule);
  renderSchedule();
}

init();
