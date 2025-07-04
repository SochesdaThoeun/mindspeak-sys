<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PostRejected extends Notification
{
    use Queueable;

    protected $post;
    protected $adminNote;

    /**
     * Create a new notification instance.
     */
    public function __construct($post, $adminNote = null)
    {
        $this->post = $post;
        $this->adminNote = $adminNote;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
                    ->line('Your post "' . $this->post->title . '" has been rejected.')
                    ->line('Reason: ' . ($this->adminNote ?: 'No specific reason provided.'))
                    ->action('Edit Post', url('/posts/' . $this->post->id . '/edit'))
                    ->line('You can edit and resubmit your post for review.');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'post_rejected',
            'data' => [
                'post_id' => $this->post->id,
                'post_title' => $this->post->title,
                'admin_note' => $this->adminNote,
                'message' => 'Your post "' . $this->post->title . '" has been rejected.' . ($this->adminNote ? ' Reason: ' . $this->adminNote : ''),
            ]
        ];
    }
}
