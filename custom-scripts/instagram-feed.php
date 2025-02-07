<?php
header('Content-Type: application/json');

$instagram_username = "gymnazium_mnichovice";
$cache_file = __DIR__ . '/insta_cache.json';
$cache_time = 3600;

if (file_exists($cache_file) && (time() - filemtime($cache_file)) < $cache_time) {
    echo file_get_contents($cache_file);
    exit;
}

$insta_url = "https://www.instagram.com/$instagram_username/";
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $insta_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
$html = curl_exec($ch);
curl_close($ch);

if (!$html) {
    echo json_encode(["error" => "Could not fetch Instagram page."]);
    exit;
}

preg_match('/window\._sharedData = (.*);<\/script>/', $html, $matches);
if (!isset($matches[1])) {
    echo json_encode(["error" => "Failed to extract Instagram data."]);
    exit;
}

$data = json_decode($matches[1], true);
if (!$data) {
    echo json_encode(["error" => "Invalid JSON format."]);
    exit;
}

$posts = [];
$media = $data['entry_data']['ProfilePage'][0]['graphql']['user']['edge_owner_to_timeline_media']['edges'];

foreach ($media as $node) {
    $post = $node['node'];
    $posts[] = [
        "image" => $post['display_url'],
        "caption" => isset($post['edge_media_to_caption']['edges'][0]['node']['text']) ? substr($post['edge_media_to_caption']['edges'][0]['node']['text'], 0, 100) . "..." : "",
        "link" => "https://www.instagram.com/p/" . $post['shortcode'] . "/"
    ];

    if (count($posts) >= 6) break;
}

if (empty($posts)) {
    echo json_encode(["error" => "No posts found. Instagram may have changed its structure."]);
    exit;
}

file_put_contents($cache_file, json_encode($posts));

echo json_encode($posts);
?>
