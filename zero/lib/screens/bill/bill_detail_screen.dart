import 'package:flutter/material.dart';
import '../../config/r.dart';
import '../../config/app_colors.dart';

class BillDetailScreen extends StatelessWidget {
  final String billId;
  final double amount;
  final String date;
  final String status;
  final String description;

  const BillDetailScreen({
    super.key,
    required this.billId,
    required this.amount,
    required this.date,
    required this.status,
    required this.description,
  });

  @override
  Widget build(BuildContext context) {
    final isSuccess = status == 'success';
    final isFailed = status == 'failed';
    final statusColor = isSuccess ? const Color(0xFF4CAF50) : (isFailed ? AppColors.muteRed : AppColors.goldLight);
    final statusText = isSuccess ? 'مدفوع' : (isFailed ? 'فشل' : 'معلق');
    final statusIcon = isSuccess ? Icons.check_circle : (isFailed ? Icons.cancel : Icons.access_time);

    return Scaffold(
      backgroundColor: const Color(0xFF1A0F0F),
      body: SafeArea(
        child: Column(
          children: [
            _buildHeader(context),
            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.symmetric(horizontal: 24),
                child: Column(
                  children: [
                    const SizedBox(height: 40),
                    Container(
                      width: 80,
                      height: 80,
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        color: statusColor.withValues(alpha: 0.15),
                      ),
                      child: Icon(statusIcon, color: statusColor, size: 44),
                    ),
                    const SizedBox(height: 20),
                    Text(
                      '\$${amount.toStringAsFixed(2)}',
                      style: const TextStyle(fontSize: 36, color: Colors.white, fontWeight: FontWeight.bold),
                    ),
                    const SizedBox(height: 8),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
                      decoration: BoxDecoration(
                        color: statusColor.withValues(alpha: 0.15),
                        borderRadius: BorderRadius.circular(20),
                      ),
                      child: Text(
                        statusText,
                        style: TextStyle(fontSize: 13, color: statusColor, fontWeight: FontWeight.w500),
                      ),
                    ),
                    const SizedBox(height: 40),
                    _buildDetailRow('رقم الفاتورة', billId),
                    _buildDivider(),
                    _buildDetailRow('التاريخ', date),
                    _buildDivider(),
                    _buildDetailRow('طريقة الدفع', 'بطاقة ائتمان'),
                    _buildDivider(),
                    _buildDetailRow('الحالة', statusText, valueColor: statusColor),
                    if (description.isNotEmpty) ...[
                      _buildDivider(),
                      _buildDetailRow('الوصف', description, isDescription: true),
                    ],
                    const SizedBox(height: 40),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildHeader(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      child: Row(
        children: [
          GestureDetector(
            onTap: () => Navigator.pop(context),
            child: Container(
              padding: const EdgeInsets.all(4),
              child: R.image(R.backIc, width: 24, height: 24),
            ),
          ),
          const Spacer(),
          const Text('تفاصيل الفاتورة', style: TextStyle(fontSize: 17, color: Colors.white, fontWeight: FontWeight.w600)),
          const Spacer(),
          const SizedBox(width: 32),
        ],
      ),
    );
  }

  Widget _buildDetailRow(String label, String value, {Color? valueColor, bool isDescription = false}) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 14),
      child: Row(
        crossAxisAlignment: isDescription ? CrossAxisAlignment.start : CrossAxisAlignment.center,
        children: [
          Text(label, style: const TextStyle(fontSize: 14, color: Colors.white54)),
          const Spacer(),
          Flexible(
            child: Text(
              value,
              textAlign: TextAlign.end,
              style: TextStyle(
                fontSize: 14,
                color: valueColor ?? Colors.white,
                fontWeight: FontWeight.w500,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildDivider() {
    return Container(height: 0.5, color: const Color(0x1AFFFFFF));
  }
}
