<?php


namespace App\Events;


use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Module;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;

class ModuleUserSubscriber implements EventSubscriberInterface{

    private $security;
    public function __construct(Security $security){
        $this->security = $security;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['moduleSetUser', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function moduleSetUser(ViewEvent $event){
        $result = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if($result instanceof Module && $method === "POST"){
            $user = $this->security->getUser();
            $result->addTeacher($user);
        }
    }
}