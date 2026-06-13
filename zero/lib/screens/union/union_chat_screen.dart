import 'package:flutter/material.dart';
import '../../../config/r.dart';
import '../../../config/app_colors.dart';

class UnionChatScreen extends StatefulWidget {
  const UnionChatScreen({super.key});

  @override
  State<UnionChatScreen> createState() => _UnionChatScreenState();
}

class _UnionChatScreenState extends State<UnionChatScreen> {
  final _ctrl = TextEditingController();
  final _scrollCtrl = ScrollController();

  final _messages = [
    {'user': 'أبو علي', 'text': 'السلام عليكم جميعاً', 'time': '10:30', 'isMe': false},
    {'user': 'سارة', 'text': 'وعليكم السلام', 'time': '10:31', 'isMe': false},
    {'user': 'خالد', 'text': 'صباح الخير', 'time': '10:32', 'isMe': false},
    {'user': 'أنا', 'text': 'صباح النور', 'time': '10:33', 'isMe': true},
    {'user': 'نور', 'text': 'هل هناك اجتماع اليوم؟', 'time': '10:35', 'isMe': false},
    {'user': 'أبو علي', 'text': 'نعم الساعة 8 مساءً', 'time': '10:36', 'isMe': false},
    {'user': 'أنا', 'text': 'تمام، سنكون موجودين', 'time': '10:38', 'isMe': true},
  ];

  @override
  void dispose() {
    _ctrl.dispose();
    _scrollCtrl.dispose();
    super.dispose();
  }

  void _send() {
    final t = _ctrl.text.trim();
    if (t.isEmpty) return;
    setState(() {
      _messages.add({'user': 'أنا', 'text': t, 'time': 'الآن', 'isMe': true});
    });
    _ctrl.clear();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (_scrollCtrl.hasClients) {
        _scrollCtrl.animateTo(
          _scrollCtrl.position.maxScrollExtent,
          duration: const Duration(milliseconds: 200),
          curve: Curves.easeOut,
        );
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.roomBg,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: IconButton(
          icon: R.image(R.backIc, width: 24, height: 24),
          onPressed: () => Navigator.pop(context),
        ),
        title: const Text('محادثة النقابة', textAlign: TextAlign.right),
      ),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              controller: _scrollCtrl,
              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
              itemCount: _messages.length,
              itemBuilder: (_, i) {
                final m = _messages[i];
                final isMe = m['isMe'] as bool;
                return Padding(
                  padding: const EdgeInsets.only(bottom: 12),
                  child: Row(
                    mainAxisAlignment: isMe ? MainAxisAlignment.end : MainAxisAlignment.start,
                    crossAxisAlignment: CrossAxisAlignment.end,
                    children: [
                      if (!isMe)
                        CircleAvatar(
                          radius: 16,
                          backgroundColor: Colors.white12,
                          child: Text(
                            (m['user'] as String)[0],
                            style: const TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.bold),
                          ),
                        ),
                      if (!isMe) const SizedBox(width: 8),
                      Flexible(
                        child: Container(
                          constraints: BoxConstraints(
                            maxWidth: MediaQuery.of(context).size.width * 0.7,
                          ),
                          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                          decoration: BoxDecoration(
                            color: isMe ? const Color(0xFF4CAF50) : AppColors.cardBg,
                            borderRadius: BorderRadius.only(
                              topLeft: const Radius.circular(14),
                              topRight: const Radius.circular(14),
                              bottomLeft: isMe ? const Radius.circular(14) : Radius.zero,
                              bottomRight: isMe ? Radius.zero : const Radius.circular(14),
                            ),
                          ),
                          child: Column(
                            crossAxisAlignment: isMe ? CrossAxisAlignment.end : CrossAxisAlignment.start,
                            children: [
                              if (!isMe)
                                Padding(
                                  padding: const EdgeInsets.only(bottom: 4),
                                  child: Text(
                                    m['user'] as String,
                                    style: const TextStyle(
                                      fontSize: 11,
                                      color: Color(0xFFFFC525),
                                      fontWeight: FontWeight.w600,
                                    ),
                                    textAlign: TextAlign.right,
                                  ),
                                ),
                              Text(
                                m['text'] as String,
                                style: const TextStyle(fontSize: 14, color: Colors.white),
                                textAlign: isMe ? TextAlign.right : TextAlign.start,
                              ),
                              const SizedBox(height: 2),
                              Text(
                                m['time'] as String,
                                style: const TextStyle(fontSize: 10, color: Colors.white38),
                                textAlign: isMe ? TextAlign.left : TextAlign.right,
                              ),
                            ],
                          ),
                        ),
                      ),
                      if (isMe) const SizedBox(width: 8),
                      if (isMe)
                        CircleAvatar(
                          radius: 16,
                          backgroundColor: Colors.white12,
                          child: Text(
                            (m['user'] as String)[0],
                            style: const TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.bold),
                          ),
                        ),
                    ],
                  ),
                );
              },
            ),
          ),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
            decoration: const BoxDecoration(
              color: Color(0xFF1A1A1A),
              border: Border(top: BorderSide(color: AppColors.divider)),
            ),
            child: SafeArea(
              top: false,
              child: Row(
                children: [
                  Expanded(
                    child: TextField(
                      controller: _ctrl,
                      textAlign: TextAlign.right,
                      style: const TextStyle(color: Colors.white, fontSize: 14),
                      decoration: InputDecoration(
                        hintText: 'اكتب رسالة...',
                        hintStyle: const TextStyle(color: Colors.white38),
                        filled: true,
                        fillColor: AppColors.cardBg,
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(24),
                          borderSide: BorderSide.none,
                        ),
                        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
                      ),
                      onSubmitted: (_) => _send(),
                    ),
                  ),
                  const SizedBox(width: 8),
                  GestureDetector(
                    onTap: _send,
                    child: Container(
                      width: 44,
                      height: 44,
                      decoration: const BoxDecoration(
                        color: Color(0xFF4CAF50),
                        shape: BoxShape.circle,
                      ),
                      child: const Icon(Icons.send, color: Colors.white, size: 20),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
