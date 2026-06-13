import 'dart:convert';
import 'dart:io';
import 'package:crypto/crypto.dart';
import 'package:http/http.dart' as http;

enum CloudinaryResourceType { image, video, auto, raw }

class CloudinaryService {
  static final CloudinaryService _instance = CloudinaryService._();
  factory CloudinaryService() => _instance;
  CloudinaryService._();

  static const String _cloudName = 'dl30muiuc';
  static const String _apiKey = '865669713469485';
  static const String _apiSecret = 'mnxgBf0IUGLH5UqJaQ4D3TjlHHs';

  String _uploadUrl(CloudinaryResourceType type) {
    final t = type == CloudinaryResourceType.auto ? 'auto' : type.name;
    return 'https://api.cloudinary.com/v1_1/$_cloudName/$t/upload';
  }

  Future<String> upload(
    File file, {
    String? publicId,
    CloudinaryResourceType type = CloudinaryResourceType.auto,
  }) async {
    final timestamp = (DateTime.now().millisecondsSinceEpoch / 1000).round().toString();
    final params = <String, String>{
      'timestamp': timestamp,
      'upload_preset': 'zero_app',
    };
    if (publicId != null) params['public_id'] = publicId;

    final signature = _generateSignature(params);
    params['api_key'] = _apiKey;
    params['signature'] = signature;

    final url = _uploadUrl(type);
    final request = http.MultipartRequest('POST', Uri.parse(url));
    request.fields.addAll(params);
    request.files.add(await http.MultipartFile.fromPath('file', file.path));

    final streamed = await request.send();
    final response = await http.Response.fromStream(streamed);

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body) as Map<String, dynamic>;
      return data['secure_url'] as String;
    }
    throw Exception('Cloudinary upload failed: ${response.statusCode} ${response.body}');
  }

  Future<String> uploadImage(File file, {String? publicId}) {
    return upload(file, publicId: publicId, type: CloudinaryResourceType.image);
  }

  Future<String> uploadVideo(File file, {String? publicId}) {
    return upload(file, publicId: publicId, type: CloudinaryResourceType.video);
  }

  String _generateSignature(Map<String, String> params) {
    final keys = params.keys.toList()..sort();
    final str = keys.map((k) => '$k=${params[k]}').join('&') + _apiSecret;
    return sha1.convert(utf8.encode(str)).toString();
  }
}
