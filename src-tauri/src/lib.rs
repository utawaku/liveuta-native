mod commands;
mod env;

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    // let mut builder = Builder::<tauri::Wry>::new().commads(collect_commands![commands::greet,]);
    // let builder = Builder::<tauri::Wry>::new().commands(collect_commands![commands::greet]);

    // #[cfg(debug_assertions)] // <- Only export on non-release builds
    // builder
    //     .export(Typescript::default(), "../src/bindings.ts")
    //     .expect("Failed to export typescript bindings");

    // tauri::Builder::default()
    //     .plugin(tauri_plugin_sql::Builder::new().build())
    //     .plugin(tauri_plugin_http::init())
    //     .invoke_handler(builder.invoke_handler())
    //     .setup(move |app| {
    //         builder.mount_events(app);

    //         Ok(())
    //     })
    //     .run(tauri::generate_context!())
    //     .expect("error while running tauri application");
    tauri::Builder::default()
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_opener::init())
        // .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_sql::Builder::new().build())
        .plugin(tauri_plugin_clipboard_manager::init())
        .invoke_handler(tauri::generate_handler![commands::greet,])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
