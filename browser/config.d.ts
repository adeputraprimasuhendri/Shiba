interface Config {
    linter: string;
    file_ext: {
        markdown: string[];
        html: string[];
        [n: string]: string[];
    };
    width: number | string;
    height: number | string;
    shortcuts: {[keyseq: string]: string};
    voice: {
        enabled: boolean;
        source: string;
    };
    lint_options?: any;
    drawer: {
        responsive: boolean;
    };
    menu: {
        visible: boolean;
    };
    ignore_path_pattern: string;
    hide_title_bar: boolean;
    markdown: {
        font_size: string;
        css_path: string;
        code_theme: string;
    };
    _config_dir_path?: string;  // Set in renderer for cache
    [name: string]: any;
}

