'use client';

import { PageHeader } from '@venator-ui/patterns';
import {
  Card, CardContent, CardHeader, Input, Label, Button, Separator, Switch,
} from '@venator-ui/ui';

export default function AdminSettingsPage() {
  return (
    <div>
      <PageHeader className="mb-5" title="Settings" meta="Workspace configuration" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card surface="raised" className="lg:col-span-2">
          <CardHeader title="General" description="Basic workspace details." separator />
          <CardContent className="mt-4 flex flex-col gap-4 max-w-md">
            <div className="space-y-1.5">
              <Label htmlFor="ws-name">Workspace name</Label>
              <Input id="ws-name" defaultValue="Venator" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ws-url">Workspace URL</Label>
              <Input id="ws-url" defaultValue="venator.app" />
            </div>
            <div className="flex gap-2 mt-1">
              <Button variant="accent" size="sm">Save changes</Button>
              <Button variant="ghost" size="sm">Cancel</Button>
            </div>
          </CardContent>
        </Card>

        <Card surface="raised">
          <CardHeader title="Security" description="Access policies." separator />
          <CardContent className="mt-4 flex flex-col gap-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-[13px] font-medium text-fg">Require MFA</div>
                <div className="text-xs text-fg-4">For all members</div>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-[13px] font-medium text-fg">SSO only</div>
                <div className="text-xs text-fg-4">Disable password login</div>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
