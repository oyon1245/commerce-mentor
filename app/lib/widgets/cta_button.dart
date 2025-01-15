import 'package:flutter/material.dart';

class CTAButton extends StatelessWidget {
  final String label;
  final VoidCallback onPressed;
  final bool isFullWidth;
  final bool isOutlined;

  const CTAButton({
    Key? key,
    required this.label,
    required this.onPressed,
    this.isFullWidth = true,
    this.isOutlined = false,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final buttonStyle = isOutlined
        ? OutlinedButton.styleFrom(
            side: BorderSide(color: Theme.of(context).primaryColor),
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(8),
            ),
          )
        : ElevatedButton.styleFrom(
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(8),
            ),
          );

    final button = isOutlined
        ? OutlinedButton(
            style: buttonStyle,
            onPressed: onPressed,
            child: Text(label),
          )
        : ElevatedButton(
            style: buttonStyle,
            onPressed: onPressed,
            child: Text(label),
          );

    return isFullWidth
        ? SizedBox(
            width: double.infinity,
            child: button,
          )
        : button;
  }
}
