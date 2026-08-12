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

**1. 반응형 상태**

- `weatherList`: 도시별 날씨 데이터 배열 (id, name, temp, status)
- `searchQuery`: 검색어
- `selectedCityInfo`: 선택된 도시 이름
- `sortOrder`: 정렬 기준 (`name` | `temp`)
- `favoriteCities`: 즐겨찾기한 도시 이름 배열
- `tempTipCity`: 온도 배지를 클릭한 도시 이름
- `tempTip`: 그 도시의 온도에 맞춰 보여줄 팁 문구

**2. computed**

- `filteredWeatherList`: 검색어가 없으면 전체 목록, 있으면 이름에 검색어가 포함된 도시만 필터링
- `sortedFilteredList`: `filteredWeatherList`를 정렬 기준(이름순/온도순)에 따라 정렬
- `averageTemp`: 필터링된 도시들의 평균 기온 계산
- `pageThemeClass`: `selectedCityInfo`로 선택된 도시를 찾아 날씨 상태에 맞는 페이지 배경 테마 클래스(`theme-sunny`/`theme-rain`/`theme-cloud`)를 반환

**3. watch / watchEffect**

- `watch(selectedCityInfo, ...)`: 선택 도시가 바뀔 때마다 이전값 → 새값 콘솔 로그
- `watch(sortOrder, ...)`: 정렬 기준이 바뀔 때마다 콘솔 로그
- `watch(favoriteCities, ..., { deep: true })`: 즐겨찾기 목록이 추가/삭제될 때마다 콘솔 로그
- `watchEffect(...)`: `searchQuery`를 참조하므로 타이핑할 때마다 자동 실행되어 현재 검색어 로그
- `toggleFavorite(cityName)` / `isFavorite(cityName)`: (기존 목록에 있던 기능, 실제 UI에서는 카드 오른쪽 아래 별표 버튼으로 동작)
- `weatherThemeClass(status)`: 날씨 상태 문자열(맑음/비/구름)을 페이지 배경 테마 클래스명으로 변환
- `showTempTip(cityName, temp)`: 온도 구간(28↑/25~27/20~24/20↓)에 따라 4단계 팁 문구를 만들어 `tempTipCity`, `tempTip`에 저장

**4. 함수(메서드)**

- `selectCity(cityName)`: 카드를 클릭하면 `selectedCityInfo`를 해당 도시로 설정
- `showDetail(cityName, status)`: "상세보기" 버튼 클릭 시 알림창으로 날씨 상태 표시
- `statusIcon(status)`: 날씨 상태(맑음/비/구름)에 맞는 이모지 아이콘 반환
- `toggleFavorite(cityName)`: 즐겨찾기 목록에 도시를 추가하거나 제거
- `isFavorite(cityName)`: 해당 도시가 즐겨찾기에 포함됐는지 여부 반환

**5. 템플릿 표시 로직**

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