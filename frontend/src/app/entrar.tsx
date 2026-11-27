import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
import { Eye, EyeOff } from 'lucide-react-native';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, StyleSheet, View } from 'react-native';
import { z } from 'zod';

import { ApiError } from '@/api/client';
import { Button } from '@/components/Button';
import { Field } from '@/components/Field';
import { GroupCard } from '@/components/GroupCard';
import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { BrandMark } from '@/features/auth/BrandMark';
import { useLogin } from '@/features/auth/api';
import { colors, minTouchSize } from '@/theme';

const schema = z.object({
  email: z.email({ error: 'Informe um e-mail válido' }),
  password: z.string().min(1, 'Informe sua senha'),
});

type FormValues = z.infer<typeof schema>;

function loginErrorMessage(error: Error) {
  if (error instanceof ApiError && error.status === 401) return 'E-mail ou senha incorretos.';
  return 'Não conseguimos entrar agora. Confira sua internet e tente de novo.';
}

export default function Entrar() {
  const login = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const { control, handleSubmit, formState } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  });

  const submit = handleSubmit((values) => login.mutate(values));

  return (
    <Screen
      footer={
        <View style={styles.footer}>
          <Text variant="secondary">Ainda não tem conta?</Text>
          <Link href="/cadastro" asChild>
            <Pressable
              accessibilityRole="link"
              accessibilityLabel="Criar conta"
              style={styles.footerLink}
            >
              <Text variant="bodyStrong" style={styles.footerLinkText}>
                Criar conta
              </Text>
            </Pressable>
          </Link>
        </View>
      }
    >
      <BrandMark />

      <Text variant="display" style={styles.headline} accessibilityRole="header">
        Do campo,{'\n'}direto pra{'\n'}sua mesa.
      </Text>
      <Text variant="secondary" style={styles.subtitle}>
        Alimentos frescos de produtores da sua região.
      </Text>

      <View style={styles.form}>
        <GroupCard>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <Field
                label="E-mail"
                value={field.value}
                onChangeText={field.onChange}
                onBlur={field.onBlur}
                error={formState.errors.email?.message}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                textContentType="username"
                returnKeyType="next"
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <Field
                label="Senha"
                value={field.value}
                onChangeText={field.onChange}
                onBlur={field.onBlur}
                error={formState.errors.password?.message}
                secureTextEntry={!showPassword}
                autoComplete="current-password"
                textContentType="password"
                returnKeyType="go"
                onSubmitEditing={() => submit()}
                trailing={
                  <Pressable
                    onPress={() => setShowPassword((value) => !value)}
                    accessibilityRole="button"
                    accessibilityLabel={showPassword ? 'Esconder senha' : 'Mostrar senha'}
                    style={styles.eye}
                  >
                    {showPassword ? (
                      <EyeOff size={24} color={colors.ink3} />
                    ) : (
                      <Eye size={24} color={colors.ink3} />
                    )}
                  </Pressable>
                }
              />
            )}
          />
        </GroupCard>

        {login.error && (
          <Text variant="secondary" style={styles.error} accessibilityLiveRegion="polite">
            {loginErrorMessage(login.error)}
          </Text>
        )}

        <Button label="Entrar" onPress={submit} loading={login.isPending} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  headline: { marginTop: 72 },
  subtitle: { marginTop: 16, fontSize: 17, lineHeight: 24, maxWidth: 300 },
  form: { marginTop: 40, gap: 16 },
  eye: {
    width: minTouchSize,
    height: minTouchSize,
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: { color: colors.clay, textAlign: 'center' },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 4,
  },
  footerLink: { minHeight: minTouchSize, justifyContent: 'center' },
  footerLinkText: { color: colors.forest },
});
