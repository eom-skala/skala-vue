# skala-vue

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

---

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
---

## 1. 반응형 상태

- `weatherList`: 도시별 날씨 데이터 배열 (id, name, temp, status)
- `searchQuery`: 검색어
- `selectedCityInfo`: 선택된 도시 이름
- `sortOrder`: 정렬 기준 (`name` | `temp`)
- `favoriteCities`: 즐겨찾기한 도시 이름 배열
- `tempTipCity`: 온도 배지를 클릭한 도시 이름
- `tempTip`: 그 도시의 온도에 맞춰 보여줄 팁 문구

## 2. computed

- `filteredWeatherList`: 검색어가 없으면 전체 목록, 있으면 이름에 검색어가 포함된 도시만 필터링
- `sortedFilteredList`: `filteredWeatherList`를 정렬 기준(이름순/온도순)에 따라 정렬
- `averageTemp`: 필터링된 도시들의 평균 기온 계산
- `pageThemeClass`: `selectedCityInfo`로 선택된 도시를 찾아 날씨 상태에 맞는 페이지 배경 테마 클래스(`theme-sunny`/`theme-rain`/`theme-cloud`)를 반환

## 3. watch / watchEffect

- `watch(selectedCityInfo, ...)`: 선택 도시가 바뀔 때마다 이전값 → 새값 콘솔 로그
- `watch(sortOrder, ...)`: 정렬 기준이 바뀔 때마다 콘솔 로그
- `watch(favoriteCities, ..., { deep: true })`: 즐겨찾기 목록이 추가/삭제될 때마다 콘솔 로그
- `watchEffect(...)`: `searchQuery`를 참조하므로 타이핑할 때마다 자동 실행되어 현재 검색어 로그
- `toggleFavorite(cityName)` / `isFavorite(cityName)`: (기존 목록에 있던 기능, 실제 UI에서는 카드 오른쪽 아래 별표 버튼으로 동작)
- `weatherThemeClass(status)`: 날씨 상태 문자열(맑음/비/구름)을 페이지 배경 테마 클래스명으로 변환
- `showTempTip(cityName, temp)`: 온도 구간(28↑/25~27/20~24/20↓)에 따라 4단계 팁 문구를 만들어 `tempTipCity`, `tempTip`에 저장

## 4. 함수(메서드)

- `selectCity(cityName)`: 카드를 클릭하면 `selectedCityInfo`를 해당 도시로 설정
- `showDetail(cityName, status)`: "상세보기" 버튼 클릭 시 알림창으로 날씨 상태 표시
- `statusIcon(status)`: 날씨 상태(맑음/비/구름)에 맞는 이모지 아이콘 반환
- `toggleFavorite(cityName)`: 즐겨찾기 목록에 도시를 추가하거나 제거
- `isFavorite(cityName)`: 해당 도시가 즐겨찾기에 포함됐는지 여부 반환

## 5. 템플릿 표시 로직

- 검색어 입력 시 "검색 중 · {검색어}" 문구 표시
- 필터링된 도시가 있을 때: 평균 기온 + 즐겨찾기 개수 표시 → 카드 그리드 렌더링(트랜지션 적용)
- 필터링된 도시가 없을 때: "검색 결과와 일치하는 도시가 없습니다" 안내
- 카드마다 기온 25도 기준으로 "더움"/"선선함" 상태 표시
- 하단 상태바: 도시 선택 여부에 따라 문구와 스타일(active 클래스) 변경
- 카드 오른쪽 아래에 즐겨찾기 별표 버튼: 클릭 시 채워진 별(★)로 바뀌고 노란 그라디언트 + 팝 애니메이션 적용, 카드 선택 이벤트로는 전파되지 않음(`@click.stop`)
- `temp-status`(더움/선선함 배지) 클릭 시 카드 선택과 별개로 `showTempTip` 실행, 하단 상태바 아래에 트랜지션과 함께 온도별 팁 바(`tip-bar`)가 나타남
- 카드를 선택하면 **카드가 아닌 페이지 전체**(`<div class="page">`) 배경이 선택된 도시의 날씨(맑음/비/구름)에 맞는 그라디언트 색으로 부드럽게(0.5s) 전환되고, 선택 해제 시 기본 배경으로 복귀

---

# 컴포넌트 분리

### WeatherParent.vue

애플리케이션의 중심이 되는 부모 컴포넌트입니다. 원본의 모든 반응형 데이터는 이 파일에 유지됩니다.

- `weatherList`: 도시별 날씨 데이터 배열
- `searchQuery`: 검색창에 입력한 도시명
- `selectedCityInfo`: 현재 선택된 도시명
- `sortOrder`: 이름순/온도순 정렬 상태
- `favoriteCities`: 즐겨찾기 도시 목록
- `tempTipCity`, `tempTip`: 온도 클릭 시 표시할 팁 정보

또한 검색 필터링, 정렬, 평균 기온, 선택 도시 기반 배경 테마를 `computed`로 계산합니다. `watch`, `watchEffect`도 부모에 그대로 두어 상태 변경을 추적합니다.

`SearchBar`와 `WeatherCard`는 `BaseDashboardCard`의 슬롯에 놓이지만, 슬롯 콘텐츠는 부모의 스코프를 사용합니다. 따라서 `WeatherParent`는 중간 컴포넌트를 거치지 않고 자식 이벤트를 직접 처리합니다.

### BaseDashboardCard.vue

대시보드 내부의 배치만 담당하는 레이아웃 컴포넌트입니다. 데이터나 이벤트 로직은 갖지 않습니다.

- `search` 슬롯: `SearchBar`가 들어가는 검색 영역
- `weather` 슬롯: 정렬 버튼, 평균 기온, `WeatherCard` 목록이 들어가는 날씨 현황 영역

이렇게 분리하면 카드 외곽 구조는 재사용하면서, 내부 콘텐츠는 부모가 원하는 형태로 주입할 수 있습니다.

### SearchBar.vue

도시 검색 UI를 담당합니다.

- 부모가 전달한 `query` props를 input 값과 “검색 중” 문구에 표시합니다.
- 사용자가 입력하면 `update-query` 이벤트에 최신 검색어를 담아 부모로 전달합니다.
- 실제 `searchQuery` 상태 변경과 검색 결과 필터링은 부모인 `WeatherParent`가 담당합니다.

즉, `SearchBar`는 입력 화면만 담당하고 데이터의 소유권은 가지지 않습니다.

### WeatherCard.vue

도시 하나의 날씨 정보를 카드 형태로 보여주는 컴포넌트입니다.

- `city`: 도시명, 기온, 날씨 상태를 포함한 도시 객체
- `selectedCity`: 현재 선택된 도시 객체. 현재 카드와 같으면 선택 스타일을 적용합니다.
- `isFavorite`: 즐겨찾기 여부에 따라 별표 모양과 스타일을 변경합니다.

사용자 동작은 부모에게 이벤트로 알립니다.

- `select-card`: 카드 본문 클릭 시 선택한 도시 객체 전달
- `click-detail`: 상세보기 클릭 시 도시 객체 전달
- `toggle-favorite`: 즐겨찾기 버튼 클릭 시 도시명 전달
- `show-temp-tip`: 기온 상태 버튼 클릭 시 도시 객체 전달

부모는 전달받은 데이터로 선택 상태, 알림창, 즐겨찾기 목록, 온도 팁을 갱신합니다.

### FeedbackPanel.vue

추가로 분리한 컴포넌트입니다. 화면 하단의 피드백 영역을 담당합니다.

- 선택된 도시가 있으면 “OO이 선택되었습니다” 상태를 보여줍니다.
- 선택된 도시가 없으면 기본 안내 문구를 보여줍니다.
- `tip` 값이 있으면 온도 상태 클릭으로 생성된 날씨 팁을 전환 애니메이션과 함께 표시합니다.

이 컴포넌트는 표시만 담당하며, 팁 생성과 선택 상태 관리는 모두 `WeatherParent`에 있습니다.

---

# 라우팅

**1. 라우팅 구조 도입**

- `router/index.js`에 정의된 경로에 맞춰, 기존 컴포넌트 조합 방식을 그대로 페이지 단위(View)로 승격
- `/` → `WeatherHomeView.vue`
- `/weather/:cityId` → `WeatherDetailView.vue`
- `/about` → `WeatherAboutView.vue`

**2. WeatherHomeView.vue** (WeatherParent 대체)

- 반응형 상태·computed·watch 로직은 `WeatherParent.vue`와 동일하게 유지
- **변경점**: `showDetail(city)`에서 `window.alert(...)`를 제거하고 `useRouter()`의 `router.push(`/weather/${city.id}`)`로 교체 → "상세보기" 클릭 시 알림창 대신 상세 페이지로 실제 이동(Programmatic Navigation)

**3. WeatherDetailView.vue** (신규)

- `/weather/:cityId` 동적 경로의 `cityId`를 props로 수신
- 홈 화면보다 필드가 풍부한 상세 Mock Data(체감온도, 습도, 풍속, 강수확률, 자외선지수, 일출/일몰, 업데이트 시각) 구성
- `onMounted` 시점에 `cityId`로 Mock Data에서 해당 도시 객체를 찾아 `cityDetail` ref에 담아 표시
- 존재하지 않는 cityId인 경우 "도시 정보를 찾을 수 없습니다" 안내 처리
- 하단에 대시보드로 돌아가는 버튼(`router.push('/')`) 포함

**4. WeatherAboutView.vue** (신규)

- 서비스 소개 문구 + 검색/즐겨찾기/상세보기 3가지 핵심 기능을 짧게 설명하는 카드형 리스트
- `RouterLink to="/"`로 메인 대시보드로 돌아가는 링크 제공

---

# Pinia 및 추가 기능

## 1. 전역 상태 관리

`main.js`에서 `createPinia()`를 등록해 여러 View가 같은 상태를 공유합니다.

### `src/stores/favorites.js`

- `favoriteCities`: 즐겨찾기한 도시 이름 배열
- `toggleFavorite(cityName)`: 도시를 즐겨찾기에 추가하거나 제거
- `isFavorite(cityName)`: 해당 도시의 즐겨찾기 여부 반환
- `removeFavorite(cityName)`: 도시 삭제 시 관련 즐겨찾기 항목도 제거

메인 대시보드와 `/favorites`는 같은 Store를 사용합니다. 따라서 메인 카드의 별표 버튼을 누르면 즐겨찾기 대시보드에 즉시 반영됩니다.

### `src/stores/configStore.js`

온도 단위와 화면 테마처럼 앱 전체에 적용되는 설정을 관리합니다.

- state `unit`: 현재 온도 단위. 초기값은 `'celsius'`
- getter `unitSymbol`: 단위에 따라 `℃` 또는 `℉` 반환
- action `toggleUnit()`: `'celsius'`와 `'fahrenheit'`를 서로 전환
- state `isDarkMode`: 다크 모드 활성 여부
- action `toggleDarkMode()`: 라이트/다크 모드를 전환

```js
const unit = ref('celsius')
const unitSymbol = computed(() =>
  unit.value === 'celsius' ? '℃' : '℉',
)

function toggleUnit() {
  unit.value = unit.value === 'celsius' ? 'fahrenheit' : 'celsius'
}
```

### `src/stores/cities.js`

도시 목록을 전역으로 관리합니다.

- `weatherList`: 대시보드·즐겨찾기·상세 화면이 함께 사용하는 도시 배열
- `addCity({ name, temp, status })`: 도시 추가 및 유효성 검사
- `removeCity(cityId)`: 사용자가 추가한 도시 삭제

기본 도시(서울·수원·부산)는 `isDefault: true`로 설정되어 삭제할 수 없습니다. 도시 이름 중복과 기온 범위(`-50℃ ~ 60℃`)도 검사합니다.



## 2. 추가 View 및 라우트

| 경로 | View | 기능 |
| --- | --- | --- |
| `/` | `WeatherHomeView.vue` | 날씨 검색, 정렬, 카드 선택, 즐겨찾기 |
| `/weather/:cityId` | `WeatherDetailView.vue` | 도시별 상세 날씨 정보 |
| `/favorites` | `FavoriteView.vue` | 즐겨찾기한 도시 목록 |
| `/cities` | `CityManageView.vue` | 도시 추가 및 삭제 관리 |
| `/settings` | `SettingsView.vue` | 온도 단위와 다크 모드 설정 |
| `/about` | `WeatherAboutView.vue` | 서비스 소개 |
| `/:pathMatch(.*)*` | `NotFoundView.vue` | 정의되지 않은 경로의 404 처리 |

모든 View는 Vue Router의 동적 import를 사용해 Lazy Loading 됩니다.



## 3. 즐겨찾기 대시보드

`FavoriteView.vue`는 `favoritesStore.favoriteCities`와 `citiesStore.weatherList`를 결합하여 즐겨찾기 도시만 표시합니다.

- 메인 카드의 별표 버튼으로 도시 추가/삭제
- 즐겨찾기 화면에서도 별표 버튼으로 즉시 제거
- 카드 또는 상세보기 클릭 시 `/weather/:cityId`로 이동
- 즐겨찾기 도시가 없으면 홈으로 이동하는 안내 표시



## 4. 도시 관리 기능

`CityManageView.vue`에서 도시명, 현재 기온, 날씨 상태(맑음/비/구름)를 입력해 도시를 추가할 수 있습니다.

- 추가된 도시는 홈·즐겨찾기·상세 페이지에 즉시 표시
- 사용자가 추가한 도시만 삭제 가능
- 도시를 삭제하면 즐겨찾기 목록에서도 함께 제거
- 새 도시의 상세 페이지도 `/weather/:cityId` 경로로 접근 가능



## 5. 온도 단위 전환

`UnitToggler.vue`는 내비게이션과 설정 화면에서 공통으로 사용합니다.

- `°C` 버튼: 섭씨 상태 활성화
- `°F` 버튼: 화씨 상태 활성화
- Store의 `toggleUnit()`만 사용해 상태를 전환
- 메인/즐겨찾기 카드, 평균 기온, 상세 페이지의 현재·체감 온도가 함께 변환

예시: `28℃`는 화씨 모드에서 `82℉`로 표시됩니다.



## 6. 다크 모드

`SettingsView.vue`의 다크 모드 스위치가 `configStore.isDarkMode`를 변경합니다.

- 앱 최상위 `.app-shell`에 `dark-mode` 클래스를 적용
- 내비게이션, 페이지 배경, 카드, 텍스트 색상을 어두운 테마로 전환
- 라이트/다크 테마 변경은 모든 라우트 화면에 공통 적용

```vue
<div class="app-shell" :class="{ 'dark-mode': configStore.isDarkMode }">
  <RouterView />
</div>
```



## 7. 레이아웃 개선

- Vite 기본 템플릿의 데스크톱 2열 `#app` Grid를 제거해 대시보드가 화면 폭 전체를 사용하도록 수정
- 내비게이션 메뉴는 왼쪽, 단위 토글과 `SKALA` 브랜딩은 오른쪽에 배치
- 날씨 카드 영역과 피드백 패널의 고정 폭 제한을 해제해 넓은 화면에서 카드 그리드가 자연스럽게 확장

---

# OpenWeather API

## 1. 실시간 날씨 데이터 연동

- 도시별 목업(가짜) 기온/날씨 상태를 OpenWeatherMap 실데이터로 교체
- 앱 최초 로드 시(`App.vue` 마운트) 등록된 모든 도시의 날씨를 자동으로 불러옴
- 홈 화면에 "⟳ 실시간 날씨 새로고침" 버튼 추가 → 수동으로 전체 목록 재조회 가능
- API 조회 실패 시 화면에 에러 메시지 표시(`⚠️ ...`)

## 2. 상세 페이지 실데이터화

- `WeatherDetailView`의 가짜 `mockDetailData` 제거
- 체감온도, 습도, 풍속, 강수량(1시간), 일출/일몰, 날씨 설명을 실제 API 값으로 표시
- 상세 페이지 자체 진입 시(홈을 거치지 않아도) 자동으로 최신 데이터 재조회
- 상세 페이지에 "⟳ 새로고침" 버튼 추가

## 3. 도시 추가 방식 변경 (직접입력 → 랜덤 추천 선택)

- 도시 이름/기온/상태를 수동 입력하던 폼 제거
- 로컬 도시 후보 목록(`cityCatalog.js`, 한국 주요 도시 40개) 중 등록되지 않은 도시로 랜덤 10개를 추천
- "🔄 다른 도시 보기"로 추천 목록 재추첨 가능
- 추천 도시 버튼 클릭 시 실제 지오코딩+날씨 조회 API를 호출해 실데이터와 함께 자동 추가
- 조회 중 로딩 상태(`OO 조회 중…`) 표시, 실패 시 목록에서 롤백하고 에러 메시지 표시

## 4. 내부 구조 정리

- `src/api/weather.js` 신설: 지오코딩(`geocodeCity`) + 현재 날씨 조회(`fetchCurrentWeather`) + 통합 헬퍼(`fetchWeatherByCityName`), 영문 날씨 코드 → 한글 상태값(맑음/비/구름/눈/흐림) 매핑 로직 포함
- `stores/cities.js`에 `isLoading`, `error` 상태와 `refreshCity`, `fetchAllWeather`, `pickRandomCityNames`, `addCityByName` 액션 추가 (기존 수동 `addCity`는 제거)