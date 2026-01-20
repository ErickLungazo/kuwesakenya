<!DOCTYPE html>
<html>
<head>
    <title>Posts</title>
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body>
    <h1>Posts</h1>
    <ul>
        @foreach ($posts as $post)
            <li>
                <h2>{{ $post->title }}</h2>
                <p>{{ $post->body }}</p>
            </li>
        @endforeach
    </ul>
</body>
</html>
