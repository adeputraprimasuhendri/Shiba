def which cmd
  dir = ENV['PATH'].split(':').find {|p| File.executable? File.join(p, cmd)}
  File.join(dir, cmd) unless dir.nil?
end

def notify file
  msg = "'#{file} failed\n#{Time.now.to_s}'"
  case
  when which('terminal-notifier')
    `terminal-notifier -message #{msg}`
  when which('notify-send')
    `notify-send #{msg}`
  when which('tmux')
    `tmux display-message #{msg}` if `tmux list-clients 1>/dev/null 2>&1` && $?.success?
  end
end

def execute(f, *args)
  print "#{f}: #{args.join(' ')}..."
  unless system(*args)
    puts "NG"
    notify f
    false
  else
    puts "OK"
    true
  end
end

ignore /^node_modules/, /^build/, /^typings/, /^bower_components/

guard :shell do
  watch /^.+\.ts/ do |m|
    dir = File.dirname m[0]
    case dir
    when 'browser', 'renderer', 'tests/browser'
      execute(m[0], 'tsc', '-p', dir)
    when 'test/main'
      execute(m[0], 'tsc', '-p', dir) &&
      execute(m[0], './node_modules/.bin/mocha', "#{dir}/test/main")
    end
  end

  watch /^.+\.slim/ do |m|
    if File.dirname(m[0]) == 'renderer'
      execute(m[0], 'slimrb', m[0], "build/static/#{File.basename(m[0], '.slim')}.html")
    end
  end
end
