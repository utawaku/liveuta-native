# Liveuta Native

## 빌드하기

### 준비물

1. [rust](https://www.rust-lang.org/) 컴파일러

[rustup](https://rustup.rs/) 설치 후 nightly 설치

2021 에디션 `1.85.0-nightly` 이상

```sh
rustup install nightly
```

2. [bun](https://bun.sh/)

```sh
curl -fsSL https://bun.sh/install | bash     # linux & macOS
powershell -c "irm bun.sh/install.ps1 | iex" # windows
```

### 프로젝트 빌드

```sh
bun run tauri build
```

## 개발

```sh
bun run tauri dev
```
