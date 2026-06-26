'use client';

import { PageHeader } from '@venator-ui/patterns';
import {
  Card, CardContent, CardHeader, Input, Label, Select, Button, Separator, Switch,
} from '@venator-ui/ui';
import { ThemeToggle } from '../../../components/theme-toggle';

export default function SettingsPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-6 pb-10 pt-8">
      <PageHeader
        className="mb-5"
        title="Settings"
        meta="AI assistant preferences"
        actions={<ThemeToggle />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card surface="raised" className="lg:col-span-2">
          <CardHeader title="Model" description="Defaults applied to new conversations." separator />
          <CardContent className="mt-4 flex flex-col gap-4 max-w-md">
            <div className="space-y-1.5">
              <Label htmlFor="model">Model</Label>
              <Select id="model" defaultValue="claude">
                <option value="claude">Claude Opus 4.8</option>
                <option value="gpt">GPT-4o</option>
                <option value="gemini">Gemini 1.5</option>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="mode">Default mode</Label>
              <Select id="mode" defaultValue="general">
                <option value="general">General</option>
                <option value="code">Code</option>
                <option value="analysis">Analysis</option>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="temperature">Temperature</Label>
              <Input id="temperature" type="number" defaultValue="0.7" min="0" max="2" step="0.1" />
            </div>
            <div className="flex gap-2 mt-1">
              <Button variant="accent" size="sm">Save changes</Button>
              <Button variant="ghost" size="sm">Cancel</Button>
            </div>
          </CardContent>
        </Card>

        <Card surface="raised">
          <CardHeader title="Preferences" description="Chat behaviour." separator />
          <CardContent className="mt-4 flex flex-col gap-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-[13px] font-medium text-fg">Stream responses</div>
                <div className="text-xs text-fg-4">Show tokens as they arrive</div>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-[13px] font-medium text-fg">Save history</div>
                <div className="text-xs text-fg-4">Keep past conversations</div>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
