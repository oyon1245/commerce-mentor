import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:provider/provider.dart';
import 'package:commerce_mentor/services/notification_service.dart';
import 'package:commerce_mentor/screens/onboarding_screen.dart';
import 'package:commerce_mentor/screens/home_screen.dart';
import 'package:commerce_mentor/theme/app_theme.dart';
import 'package:commerce_mentor/providers/app_state.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  await NotificationService().initialize();
  
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AppState()),
      ],
      child: const CommerceMentorApp(),
    ),
  );
}

class CommerceMentorApp extends StatelessWidget {
  const CommerceMentorApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Commerce Mentor',
      theme: AppTheme.lightTheme,
      darkTheme: AppTheme.darkTheme,
      themeMode: ThemeMode.system,
      debugShowCheckedModeBanner: false,
      home: const OnboardingScreen(),
      routes: {
        '/home': (context) => const HomeScreen(),
      },
    );
  }
}
