import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:provider/provider.dart';
import 'package:commerce_mentor_admin/services/auth_service.dart';
import 'package:commerce_mentor_admin/screens/login_screen.dart';
import 'package:commerce_mentor_admin/screens/dashboard_screen.dart';
import 'package:commerce_mentor_admin/providers/admin_state.dart';
import 'package:commerce_mentor_admin/theme/admin_theme.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AdminState()),
        Provider<AuthService>(create: (_) => AuthService()),
      ],
      child: const AdminApp(),
    ),
  );
}

class AdminApp extends StatelessWidget {
  const AdminApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Commerce Mentor Admin',
      theme: AdminTheme.lightTheme,
      darkTheme: AdminTheme.darkTheme,
      themeMode: ThemeMode.system,
      debugShowCheckedModeBanner: false,
      home: StreamBuilder(
        stream: context.read<AuthService>().authStateChanges,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          }
          
          if (snapshot.hasData) {
            return const DashboardScreen();
          }
          
          return const LoginScreen();
        },
      ),
    );
  }
}
