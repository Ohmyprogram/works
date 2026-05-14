# Codex 세팅 체크리스트

이 프로젝트는 `hong-minji/works` 템플릿을 Codex에서 바로 다룰 수 있게 가져온 Gatsby + Notion CMS 블로그입니다.

## 1. Notion에서 준비할 것

1. <https://www.notion.so/my-integrations>에서 새 Integration을 만듭니다.
2. Capabilities는 최소 `Read content`를 켭니다.
3. Internal Integration Secret을 복사합니다. 이 값이 `NOTION_API_KEY`입니다.
4. Notion 데이터베이스를 만들고 아래 속성을 추가합니다.

| 이름 | 타입 | 메모 |
| --- | --- | --- |
| `Title` 또는 `Name` | Title | 글 제목 |
| `Slug` | Text | 예: `/posts/my-first-post` |
| `Date` | Date | 게시일 |
| `Category` | Select | 카테고리 |
| `Tags` | Multi-select | 태그 |
| `Description` | Text | 요약 |
| `Draft` | Checkbox | 체크하면 비공개 |
| `Template` | Select | `post` 또는 `page` |
| `Social Image` | Files & media | 선택 |

5. 데이터베이스 우측 상단 `Share`에서 Integration을 초대합니다.
6. 데이터베이스 URL에서 32자 ID를 복사합니다. 이 값이 `NOTION_DATABASE_ID`입니다.

## 2. 로컬 환경변수

`.env.example`을 복사해서 `.env.development`를 만들고 실제 값을 넣습니다.

```bash
cp .env.example .env.development
```

```env
NOTION_API_KEY=secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

`.env.development`는 `.gitignore`에 포함되어 있으니 커밋하지 않습니다.

## 3. 로컬 실행

```bash
npm start
```

브라우저에서 <http://localhost:8000>을 엽니다. GraphQL 확인은 <http://localhost:8000/___graphql>에서 합니다.

## 4. GitHub Pages 자동 배포

GitHub 저장소를 만든 뒤 아래 Secrets를 추가합니다.

- `NOTION_API_KEY`
- `NOTION_DATABASE_ID`

경로는 `Settings` -> `Secrets and variables` -> `Actions` -> `New repository secret`입니다.

GitHub Pages는 `Settings` -> `Pages`에서 `Deploy from a branch`, `gh-pages`, `/ (root)`로 설정합니다.

## 5. 사이트 정보 바꾸기

`content/config.json`에서 이름, URL, 소개, 연락처를 본인 정보로 바꿉니다.

- `url`: `https://<github-username>.github.io/<repo-name>`
- `pathPrefix`: `/<repo-name>`

저장소 이름을 `works`가 아닌 다른 이름으로 만들면 두 값을 함께 바꿔야 합니다.
