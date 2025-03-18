// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    let env = include_str!("../../.env");
    dotenvy::from_read(env.as_bytes()).expect("Cannot read environment variables");
    liveuta_native_lib::run()
}
