const matches = [
  {
    id: 1,
    utcKickoff: '2026-06-11T18:00:00Z',
    stage: 'Group A',
    homeTeam: 'Mexico',
    awayTeam: 'Japan',
    stadium: 'Estadio Azteca',
    city: 'Mexico City'
  },
  {
    id: 2,
    utcKickoff: '2026-06-12T01:00:00Z',
    stage: 'Group B',
    homeTeam: 'United States',
    awayTeam: 'Ghana',
    stadium: 'SoFi Stadium',
    city: 'Los Angeles'
  },
  {
    id: 3,
    utcKickoff: '2026-06-12T16:00:00Z',
    stage: 'Group C',
    homeTeam: 'England',
    awayTeam: 'Serbia',
    stadium: 'MetLife Stadium',
    city: 'New York/New Jersey'
  },
  {
    id: 4,
    utcKickoff: '2026-06-13T20:00:00Z',
    stage: 'Group D',
    homeTeam: 'France',
    awayTeam: 'Canada',
    stadium: 'BC Place',
    city: 'Vancouver'
  },
  {
    id: 5,
    utcKickoff: '2026-06-14T18:00:00Z',
    stage: 'Group E',
    homeTeam: 'Brazil',
    awayTeam: 'Croatia',
    stadium: 'AT&T Stadium',
    city: 'Dallas'
  },
  {
    id: 6,
    utcKickoff: '2026-06-14T23:00:00Z',
    stage: 'Group F',
    homeTeam: 'Argentina',
    awayTeam: 'Morocco',
    stadium: 'Hard Rock Stadium',
    city: 'Miami'
  },
  {
    id: 7,
    utcKickoff: '2026-06-15T19:00:00Z',
    stage: 'Group G',
    homeTeam: 'Germany',
    awayTeam: 'South Korea',
    stadium: 'Lumen Field',
    city: 'Seattle'
  },
  {
    id: 8,
    utcKickoff: '2026-06-16T02:00:00Z',
    stage: 'Group H',
    homeTeam: 'Spain',
    awayTeam: 'Australia',
    stadium: 'NRG Stadium',
    city: 'Houston'
  },
  {
    id: 9,
    utcKickoff: '2026-06-17T00:00:00Z',
    stage: 'Round of 32',
    homeTeam: 'Netherlands',
    awayTeam: 'United States',
    stadium: 'Mercedes-Benz Stadium',
    city: 'Atlanta'
  },
  {
    id: 10,
    utcKickoff: '2026-06-18T21:00:00Z',
    stage: 'Round of 32',
    homeTeam: 'Portugal',
    awayTeam: 'Uruguay',
    stadium: 'Levi’s Stadium',
    city: 'San Francisco Bay Area'
  }
];

const countryCodeByTeam = {
  Argentina: 'AR',
  Australia: 'AU',
  Brazil: 'BR',
  Canada: 'CA',
  Croatia: 'HR',
  England: 'GB',
  France: 'FR',
  Germany: 'DE',
  Ghana: 'GH',
  Japan: 'JP',
  Mexico: 'MX',
  Morocco: 'MA',
  Netherlands: 'NL',
  Portugal: 'PT',
  Serbia: 'RS',
  'South Korea': 'KR',
  Spain: 'ES',
  'United States': 'US',
  Uruguay: 'UY'
};

const storageKey = 'wc2026MyTeam';
const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const countryFilter = document.getElementById('country-filter');
const timezoneLabel = document.getElementById('timezone-label');
const saveTeamButton = document.getElementById('save-team');
const clearTeamButton = document.getElementById('clear-team');
const savedTeamNote = document.getElementById('saved-team-note');

const scheduleList = document.getElementById('schedule-list');
const todayList = document.getElementById('today-list');
const upcomingList = document.getElementById('upcoming-list');

const scheduleEmpty = document.getElementById('schedule-empty');
const todayEmpty = document.getElementById('today-empty');
const upcomingEmpty = document.getElementById('upcoming-empty');

function toFlagEmoji(code) {
  if (!code) return '🏳️';
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

function toYmdLocal(dateInput) {
  const date = new Date(dateInput);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
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

function renderMatchGroup(container, emptyNode, list) {
  container.innerHTML = '';
  if (!list.length) {
    emptyNode.hidden = false;
    return;
  }

  emptyNode.hidden = true;
  list.forEach((match) => container.appendChild(buildMatchCard(match)));
}

function getFilteredMatches() {
  const selected = countryFilter.value;
  if (selected === 'all') {
    return matches;
  }

  return matches.filter((match) => match.homeTeam === selected || match.awayTeam === selected);
}

function renderAllSections() {
  const filtered = getFilteredMatches();
  renderMatchGroup(scheduleList, scheduleEmpty, filtered);

  const now = new Date();
  const todayYmd = toYmdLocal(now);
  const dayMatches = filtered.filter((match) => toYmdLocal(match.utcKickoff) === todayYmd);

  const next24hMatches = filtered.filter((match) => {
    const kickoff = new Date(match.utcKickoff);
    const diff = kickoff.getTime() - now.getTime();
    return diff >= 0 && diff <= 24 * 60 * 60 * 1000;
  });

  renderMatchGroup(todayList, todayEmpty, dayMatches);
  renderMatchGroup(upcomingList, upcomingEmpty, next24hMatches);
}

function buildCountryFilter() {
  const teams = new Set();
  matches.forEach((match) => {
    teams.add(match.homeTeam);
    teams.add(match.awayTeam);
  });

  [...teams].sort().forEach((team) => {
    const option = document.createElement('option');
    option.value = team;
    option.textContent = getTeamLabel(team);
    countryFilter.appendChild(option);
  });

  const savedTeam = localStorage.getItem(storageKey);
  if (savedTeam && [...countryFilter.options].some((opt) => opt.value === savedTeam)) {
    countryFilter.value = savedTeam;
    savedTeamNote.textContent = `Loaded My Team: ${savedTeam}`;
  }
}

function setupTeamActions() {
  saveTeamButton.addEventListener('click', () => {
    if (countryFilter.value === 'all') {
      savedTeamNote.textContent = 'Select a team first, then save it as My Team.';
      return;
    }

    localStorage.setItem(storageKey, countryFilter.value);
    savedTeamNote.textContent = `Saved My Team: ${countryFilter.value}`;
  });

  clearTeamButton.addEventListener('click', () => {
    localStorage.removeItem(storageKey);
    savedTeamNote.textContent = 'Saved team removed.';
  });
}

function setupSeoSportsEvents() {
  const featured = matches.slice(0, 3).map((match) => ({
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
  timezoneLabel.textContent = timezone;
  buildCountryFilter();
  setupTeamActions();
  setupSeoSportsEvents();

  countryFilter.addEventListener('change', renderAllSections);
  renderAllSections();
}

init();
