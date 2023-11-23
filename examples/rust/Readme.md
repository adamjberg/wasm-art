# Rust WASM Art Example

## Install Rust

https://www.rust-lang.org/tools/install

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

## Add wasm32 target

```bash
rustup target add wasm32-unknown-unknown
```

## Compile wasm

```bash
cargo build --target wasm32-unknown-unknown --release
```

OR 

```bash
make
```

Wasm output will be written to `target/wasm32-unknown-unknown/release/wasm_art_example.wasm`

## Try It

Head to [https://wasm-art-main-adamjberg.engram.sh/](https://wasm-art-main-adamjberg.engram.sh) and drag the built wasm file onto the canvas.
